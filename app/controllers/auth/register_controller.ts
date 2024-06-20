import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { registerValidator } from '#validators/auth'

export default class RegisterController {
  async handle({ request }: HttpContext) {
    const userData = await request.validateUsing(registerValidator)

    const user = await User.create(userData)

    const token = await User.accessTokens.create(user)

    return token
  }
}
