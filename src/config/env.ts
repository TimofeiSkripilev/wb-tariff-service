import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadEnv(dir: string[]) {
    const envDir = path.join(__dirname, ...dir);

    if (process.env.NODE_ENV === "production") {
        return dotenv.config({ path: path.join(envDir, ".env") });
    } else {
        return dotenv.config({ path: path.join(envDir, ".env.local") });
    }
}

loadEnv(["..", ".."]);

const envSchema = z.object({
    WB_API_KEY: z.string(),
    WB_ENDPOINT: z.string(),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
    GOOGLE_PRIVATE_KEY: z.string(),
    GOOGLE_SHEET_IDS: z.string(),
    GOOGLE_SHEET_TAB: z.string(),
    PSQL_CONNECTION: z.string(),
});

const env = envSchema.parse(process.env);

export default env;