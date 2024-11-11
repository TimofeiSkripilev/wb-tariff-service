exports.up = function (knex) {
    return knex.schema.createTable("fees", (table) => {
        table.increments("id").primary();
        table.date("request_date").notNullable();
        table.timestamp("request_timestamp").notNullable();
        table.date("dt_next_box").nullable();
        table.date("dt_till_max").nullable();
        
        // Foreign key to warehouses
        table.integer("warehouse_id").notNullable()
            .references("id")
            .inTable("warehouses")
            .onDelete("CASCADE");
            
        table.string("box_delivery_and_storage_expr").notNullable();
        table.string("box_delivery_base").notNullable();
        table.string("box_delivery_liter").notNullable();
        table.string("box_storage_base").notNullable();
        table.string("box_storage_liter").notNullable();
        
        // Composite index for efficient querying
        table.index(["request_date", "warehouse_id"]);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("fees");
};