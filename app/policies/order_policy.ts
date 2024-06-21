import User from '#models/user'
import Order from '#models/order'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import BasePolicy from './base_policy.js'
import OrderStatus from '../enums/order_status.js'

export default class OrderPolicy extends BasePolicy {
  view(user: User, order: Order): AuthorizerResponse {
    return user.id === order.userId
  }

  update(user: User, order: Order): AuthorizerResponse {
    if (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) {
      return false
    }
    return user.id === order.userId
  }

  destroy(user: User, order: Order): AuthorizerResponse {
    if (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) {
      return false
    }
    return user.id === order.userId
  }
}
