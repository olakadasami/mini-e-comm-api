import Token from '#models/token'
import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class VerifyEmailController {
  async verify({ params }: HttpContext) {
    const user = await Token.getTokenUser(params.token, 'VERIFY_EMAIL')

    if (!user) {
      throw new Exception('Invalid Token', {
        code: 'E_NOT_AUTHORIZED',
      })
    }

    user.isVerified = true
    await user.save()

    return user
  }
}
