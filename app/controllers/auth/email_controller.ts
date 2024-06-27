import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class EmailController {
  async confirm({ params }: HttpContext) {
    const { token } = params

    const tokenRecord = await User.emailVerificationTokens.verify()
    const user = await User.findOrFail(tokenRecord?.tokenableId)

    return { user }
  }
}
