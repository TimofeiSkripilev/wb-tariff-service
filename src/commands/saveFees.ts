import { FeesService } from "#services/feesService.ts"

export async function saveFees() {
    const feesService = new FeesService();
    try {
        await feesService.uploadAllToGoogleSheets();
        console.log("Fees saved to Google Sheets successfully");
    } catch (error) {
        console.error("Error saving fees to Google Sheets:", error);
        throw error;
    }
}