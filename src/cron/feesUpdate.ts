import { CronJob } from "cron";
import { FeesService } from "#services/feesService.ts"

const feesService = new FeesService();

export const feesUpdateJob = new CronJob(
    "0 * * * *", // Run every hour
    async () => {
        try {
            await feesService.fetchAndStoreFees();
            await feesService.uploadAllToGoogleSheets();
            console.log("Fees updated successfully");
        } catch (error) {
            console.error("Error updating fees:", error);
        }
    },
    null,
    true,
    "UTC"
);