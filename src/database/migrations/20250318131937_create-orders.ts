import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("orders", (table) => {
        table.increments("id").primary(),
        table.string("name_Orders").notNullable(),
        

        table.integer("catalog_id")
        .notNullable()
        .references("id")
        .inTable("catalog"),

        table.integer("quantity").notNullable(),
        table.decimal("price_orders").notNullable(),
        table.timestamp("created-at").defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("orders")
}

