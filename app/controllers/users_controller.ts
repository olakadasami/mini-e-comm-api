import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of Users
   *
   * GET ''
   */
  async index({}: HttpContext) {
    const users = await User.all()

    return users
  }

  /**
   * Handle form submission for the create action
   *
   * POST ''
   */
  async store({ request }: HttpContext) {
    const userData = await request.validateUsing(registerValidator)

    const user = await User.create(userData)

    return user
  }

  /**
   * Show individual record
   *
   * GET ':id'
   */
  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)

    return user
  }

  /**
   * Handle form submission for the edit action
   *
   * PATCH ':id'
   */
  async update({ params, request }: HttpContext) {
    const data = request.only(['firstName', 'lastName'])
    const user = await User.findOrFail(params.id)

    const updatedUser = await user.merge(data).save()
    return updatedUser
  }

  /**
   * Delete record
   *
   * DELETE ':id'
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.status(204).json(null)
  }
}
