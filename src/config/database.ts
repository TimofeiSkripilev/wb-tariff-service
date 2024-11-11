import knex from "knex";
import env from "./env.ts";

const db = knex({
    client: "pg",
    connection: process.env.PSQL_CONNECTION,
    pool: {
        min: 2,
        max: 10,
    },
});

export default db;