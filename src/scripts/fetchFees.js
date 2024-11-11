import { getFees } from "#commands/getFees.ts";

getFees()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));