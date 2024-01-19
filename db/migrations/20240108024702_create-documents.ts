import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("transactions");

  if (!tableExists) {
    await knex.schema.createTable("transactions", (table) => {
      table.uuid("id").primary();
      table.text("title").notNullable();
      table.decimal("amount", 10, 2).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("transactions");
}
