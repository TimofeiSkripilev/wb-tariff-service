import express from "express";
import { feesUpdateJob } from "#cron/feesUpdate.ts";
import { FeesService } from "#services/feesService.ts";

const app = express();
const port = process.env.PORT || 3000;

feesUpdateJob.start();

app.post("/trigger-update", async (req, res) => {
    try {
        const feesService = new FeesService();
        await feesService.fetchAndStoreFees();
        await feesService.uploadAllToGoogleSheets();
        res.json({ success: true });
    } catch (error) {
        console.error("Error in manual trigger:", error);
        res.status(500).json({ error: "Failed to update fees" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});