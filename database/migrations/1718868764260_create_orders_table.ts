import { BaseSchema } from '@adonisjs/lucid/schema'
import OrderStatus from '../../app/enums/order_status.js'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.integer('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE')

      table.integer('status').notNullable().defaultTo(OrderStatus.PENDING)
      table.decimal('total_amount').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
