import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import { addNewCartItemValidator } from '#validators/cart'
import type { HttpContext } from '@adonisjs/core/http'

export default class CartController {
  /**
   * @description Show a user's cart
   * @route GET ':userId'
   * @param {number} userId
   */
  async show({ params, response }: HttpContext) {
    const cart = await Cart.query().where('user_id', params.userId).preload('items').first()
    if (!cart) {
      return response.status(404).json({ message: 'Cart not found' })
    }
    return response.json(cart)
  }

  /**
   * @description add new cartItem to user's cart
   * @route POST 'add-item'
   * @body {userId, productId, quantity}
   */
  async addItem({ request, response }: HttpContext) {
    const { userId, productId, quantity } = await request.validateUsing(addNewCartItemValidator)

    const cart = await Cart.firstOrCreate({ userId })

    const cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
    })

    return response.status(201).json(cartItem)
  }

  /**
   * @description update items in a user's cart
   * @route POST 'update-item/:id'
   * @param {number} id
   */
  async updateItem({ params, request, response }: HttpContext) {
    const cartItem = await CartItem.findOrFail(params.id)
    const { quantity } = request.only(['quantity'])

    await cartItem.merge({ quantity }).save()

    return response.json(cartItem)
  }

  /**
   * @route DELETE 'remove-item/:id'
   * @description Remove one item from cart
   * @param {number} id
   */
  async removeItem({ params, response }: HttpContext) {
    const cartItem = await CartItem.findOrFail(params.id)

    await cartItem.delete()
    return response.status(204).json(null)
  }

  /**
   * @description Clear the users cart
   * @route DELETE 'clear/:userId'
   * @param{number} userId
   */
  async clear({ params, response }: HttpContext) {
    const cart = await Cart.findByOrFail('user_id', params.userId)

    await CartItem.query().where('cart_id', cart.id).delete()
    return response.status(204).json(null)
  }
}
