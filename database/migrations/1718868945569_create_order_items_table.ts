import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('orders.id').notNullable().onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .notNullable()
        .onDelete('CASCADE')

      table.integer('quantity').notNullable().unsigned().defaultTo(1)
      table.decimal('price').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
