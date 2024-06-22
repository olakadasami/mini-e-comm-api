import Product from '#models/product'
import ProductPolicy from '#policies/product_policy'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const products = await Product.all()
    return products
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, bouncer }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)

    await bouncer.with(ProductPolicy).authorize('store')

    const product = await Product.create(data)

    return response.status(201).json(product)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    return product
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, bouncer }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const data = request.only(['name', 'description', 'price', 'categoryId', 'stockQuantity'])

    await bouncer.with(ProductPolicy).authorize('update')

    await product.merge(data).save()
    return product
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    await product.delete()
    return response.status(204).json(null)
  }
}
