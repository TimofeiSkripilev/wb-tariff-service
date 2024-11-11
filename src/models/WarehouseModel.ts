import { Knex } from "knex";
import db from "#config/database.ts";

export class WarehouseModel {
    private db: Knex;

    constructor() {
        this.db = db;
    }

    async findOrCreate(name: string): Promise<number> {
        const trx = await this.db.transaction();
        
        try {
            // Try to find existing warehouse
            const existing = await trx('warehouses')
                .where({ name })
                .first();

            if (existing) {
                await trx.commit();
                return Number(existing.id); // Ensure it's a number
            }

            // If not found, create new warehouse
            const [result] = await trx('warehouses')
                .insert({ name })
                .returning('id');

            await trx.commit();
            // Extract the ID number from the result
            return typeof result === 'object' ? Number(result.id) : Number(result);
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    async getWarehouseByName(name: string) {
        return this.db("warehouses")
            .where({ name })
            .first();
    }
}