const standardConfig = {
    client: "pg",
    connection: process.env.PSQL_CONNECTION,
    migrations: {
        directory: "./db/migrations",
        tableName: "migrations",
        extension: "cjs",
        loadExtensions: [".cjs", ".js"],
    },
    seeds: {
        directory: "./db/seeds",
        extension: "cjs",
        loadExtensions: [".cjs", ".js"],
    },
};

export default {
    development: {
        ...standardConfig,
    },

    staging: {
        ...standardConfig,
    },

    production: {
        ...standardConfig,
    },
};
