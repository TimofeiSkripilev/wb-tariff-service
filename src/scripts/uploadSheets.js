import { saveFees } from "#commands/saveFees.ts";

saveFees()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));