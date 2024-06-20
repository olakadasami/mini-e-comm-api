import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cart_id').unsigned().references('carts.id').notNullable().onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .notNullable()
        .onDelete('CASCADE')

      table.integer('quantity').notNullable().defaultTo(1)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
