import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Cart from './cart.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Order from './order.js'
import mail from '@adonisjs/mail/services/main'
import Token from './token.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  static emailVerificationTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '10 min',
    prefix: 'oat_',
    type: 'email_verification_token',
  })

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roleId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare isVerified: boolean

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasOne(() => Cart)
  declare cart: HasOne<typeof Cart>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasMany(() => Token)
  declare tokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', 'PASSWORD_RESET'),
  })
  declare passwordResetTokens: HasMany<typeof Token>

  async sendEmailVerification() {
    const verificationToken = await User.emailVerificationTokens.create(this)
    await mail.send((message) => {
      message
        .to(this.email)
        .subject('Verify your email address')
        .htmlView('emails/verify', { user: this, token: verificationToken.value })
    })
  }
}
