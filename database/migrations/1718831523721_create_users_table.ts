import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '../../app/enums/roles.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('role_id').unsigned().notNullable().defaultTo(Roles.USER)

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()

      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('phone').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
