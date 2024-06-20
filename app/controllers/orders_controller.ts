import Order from '#models/order'
import OrderPolicy from '#policies/order_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const orders = await Order.query().preload('items').preload('owner')
    return orders
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['userId', 'status', 'totalAmount'])
    const orderItems = request.input('order_items')

    const order = await Order.create(data)
    order.items = orderItems
    order.save()

    return response.status(201).json(order)
  }

  /**
   * Show individual record
   */
  async show({ params, response, bouncer }: HttpContext) {
    const order = await Order.query().where('order_id', params.id).preload('items').first()
    if (!order) {
      return response.status(404).json({ message: 'Order not found' })
    }
    await bouncer.with(OrderPolicy).authorize('view', order)

    return response.json(order)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, bouncer }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    const data = request.only(['status', 'totalAmount'])

    await bouncer.with(OrderPolicy).authorize('update', order)

    await order.merge(data).save()
    return order
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    const order = await Order.findOrFail(params.id)

    await bouncer.with(OrderPolicy).authorize('destroy', order)

    await order.delete()
    return response.status(204).json(null)
  }
}
