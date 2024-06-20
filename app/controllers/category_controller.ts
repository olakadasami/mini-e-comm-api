import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoryController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const categories = await Category.all()
    return categories
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['name'])
    const category = await Category.create(data)
    return response.status(201).json(category)
  }

  /**
   * Show individual category record
   */
  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    return category
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.only(['name'])
    const category = await Category.findOrFail(params.id)

    await category.merge(data).save()
    return category
  }

  /**
   * Delete category record
   */
  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    await category.delete()
    return response.status(204).json(null)
  }
}
