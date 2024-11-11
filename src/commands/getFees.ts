import { FeesService } from "#services/feesService.ts";

export async function getFees() {
    const feesService = new FeesService();
    try {
        const fees = await feesService.fetchAndStoreFees();
        console.log("Fees fetched successfully:", fees);
        return fees;
    } catch (error) {
        console.error("Error fetching fees:", error);
        throw error;
    }
}