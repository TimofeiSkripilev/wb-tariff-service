import axios from "axios";
import { google } from "googleapis";
import { BoxFeesResponse } from "#types/fees.ts";
import { FeesModel } from "#models/FeesModel.ts";
import env from "#config/env.ts";

export class FeesService {
    private feesModel: FeesModel;

    constructor() {
        this.feesModel = new FeesModel();
    }

    async fetchAndStoreFees() {
        const today = new Date().toISOString().split("T")[0];
        const url = `${env.WB_ENDPOINT}?date=${today}`;
        console.log(url);
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: env.WB_API_KEY,
                },
            });

            await this.feesModel.saveFees(response.data as BoxFeesResponse, today);
            return response.data;
        } catch (error) {
            console.error("Error fetching fees:", error);
            throw error;
        }
    }

    async uploadAllToGoogleSheets() {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: env.GOOGLE_PRIVATE_KEY,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        console.log(env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
        const sheets = google.sheets({ version: "v4", auth });
        const today = new Date().toISOString().split("T")[0];
        const fees = await this.feesModel.getAllFees();

        const headers = [
            "Дата запроса",
            "Склад",
            "Формула расчета",
            "Доставка база",
            "Доставка литр",
            "Хранение база",
            "Хранение литр",
            "Дата следующего короба",
            "Дата максимум",
        ];

        const sheetIds = env.GOOGLE_SHEET_IDS?.split(",") || [];

        for (const sheetId of sheetIds) {
            try {
                const values = fees
                    .filter((fee) => fee.request_date)
                    .map((fee) => [
                        fee.request_date?.split("T")[0] || "",
                        fee.warehouse_name,
                        fee.box_delivery_and_storage_expr,
                        fee.box_delivery_base,
                        fee.box_delivery_liter,
                        fee.box_storage_base,
                        fee.box_storage_liter,
                        fee.dt_next_box?.split("T")[0] || "",
                        fee.dt_till_max?.split("T")[0] || "",
                    ]);

                values.sort((a, b) => {
                    if (!a[0]) return 1; // Move undefined/null values to the end
                    if (!b[0]) return -1; // Move undefined/null values to the end
                    return String(b[0]).localeCompare(String(a[0]));
                });

                const allValues = [headers, ...values];
                await sheets.spreadsheets.values.update({
                    spreadsheetId: sheetId.trim(),
                    range: `${env.GOOGLE_SHEET_TAB || "stocks_coefs"}!A2`,
                    valueInputOption: "RAW",
                    requestBody: {
                        values: allValues,
                    },
                });
            } catch (error) {
                console.error(`Error updating sheet ${sheetId}:`, error);
            }
        }
    }
}
