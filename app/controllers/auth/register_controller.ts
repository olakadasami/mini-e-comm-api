import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { registerValidator } from '#validators/auth'
import mail from '@adonisjs/mail/services/main'

export default class RegisterController {
  async handle({ request }: HttpContext) {
    const userData = await request.validateUsing(registerValidator)

    const user = await User.create(userData)

    const verificationToken = await User.emailVerificationTokens.create(user)
    console.log(verificationToken)
    const url = `http://localhost:3333/verify-email/${verificationToken.hash}`
    await mail.send((message) => {
      message
        .to(user.email)
        .subject('Verify your email address')
        .htmlView('emails/verify', { user, url, token: verificationToken.hash })
    })

    // const token = await User.accessTokens.create(user)

    return { message: 'Confirm your email to complete registration' }
  }
}
