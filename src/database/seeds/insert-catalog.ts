import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("catalog").del();

    // Inserts seed entries
    await knex("catalog").insert([
        { name: "Creme com flocos", price: 7.90 },
        { name: "Chocolate", price: 9.90 },
        { name: "Flocos", price: 7.90 },
        { name: "Creme com passas", price: 8.90 },
        { name: "Açaí", price: 5.90},
        { name: "Brigadeiro", price: 10.90 }
    ]);
};
