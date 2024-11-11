import { Knex } from "knex";
import db from "#config/database.ts";
import { BoxFeesResponse } from "#types/fees.ts";
import { WarehouseModel } from "./WarehouseModel.ts";

export class FeesModel {
    private db: Knex;
    private warehouseModel: WarehouseModel;

    constructor() {
        this.db = db;
        this.warehouseModel = new WarehouseModel();
    }

    private validateDate(dateStr: string): string | null {
        if (!dateStr || dateStr.trim() === '') {
            return null;
        }
        return dateStr;
    }

    async saveFees(boxFees: BoxFeesResponse, requestDate: string) {
        const { data } = boxFees.response;
        const timestamp = new Date();

        const trx = await this.db.transaction();
        console.log(JSON.stringify(data))
        try {
            // Delete existing records for the same date
            await trx("fees")
                .where("request_date", requestDate)
                .delete();

            // Insert new records with warehouse relationships
            const records = [];
            for (const warehouse of data.warehouseList) {
                const warehouseId = await this.warehouseModel.findOrCreate(
                    warehouse.warehouseName
                );

                records.push({
                    request_date: requestDate,
                    request_timestamp: timestamp,
                    dt_next_box: this.validateDate(data.dtNextBox),
                    dt_till_max: this.validateDate(data.dtTillMax),
                    warehouse_id: warehouseId, // This should now be a number
                    box_delivery_and_storage_expr: warehouse.boxDeliveryAndStorageExpr,
                    box_delivery_base: warehouse.boxDeliveryBase,
                    box_delivery_liter: warehouse.boxDeliveryLiter,
                    box_storage_base: warehouse.boxStorageBase,
                    box_storage_liter: warehouse.boxStorageLiter,
                });
            }

            // Insert all records
            if (records.length > 0) {
                await trx("fees").insert(records);
            }
            await trx.commit();
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    async getFeesByDate(date: string) {
        return this.db("fees")
            .join("warehouses", "fees.warehouse_id", "warehouses.id")
            .where("fees.request_date", date)
            .orderBy("fees.box_delivery_and_storage_expr")
            .select(
                "warehouses.name as warehouse_name",
                "fees.box_delivery_and_storage_expr",
                "fees.box_delivery_base",
                "fees.box_delivery_liter",
                "fees.box_storage_base",
                "fees.box_storage_liter",
                "fees.request_date",
                "fees.dt_next_box",
                "fees.dt_till_max"
            );
    }

    async getAllFees() {
        return this.db("fees")
            .join("warehouses", "fees.warehouse_id", "warehouses.id")
            .orderBy([
                { column: 'fees.request_date', order: 'desc' },
                { column: 'fees.box_delivery_and_storage_expr', order: 'asc' }
            ])
            .select(
                "fees.request_date",
                "warehouses.name as warehouse_name",
                "fees.box_delivery_and_storage_expr",
                "fees.box_delivery_base",
                "fees.box_delivery_liter",
                "fees.box_storage_base",
                "fees.box_storage_liter",
                "fees.dt_next_box",
                "fees.dt_till_max"
            );
    }
}