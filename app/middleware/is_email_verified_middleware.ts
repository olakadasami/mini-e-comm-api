import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class IsEmailVerifiedMiddleware {
  async handle({ auth }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    if (auth.user && !auth.user.isVerified) {
      throw new Exception('User must be verified to access this route', {
        code: 'E_AUTHORIZATION_FAILURE',
        status: 403,
      })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
