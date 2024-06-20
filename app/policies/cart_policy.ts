import User from '#models/user'
import Cart from '#models/cart'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import BasePolicy from './base_policy.js'

export default class CartPolicy extends BasePolicy {
  view(user: User, cart: Cart): AuthorizerResponse {
    return user.id === cart.userId
  }

  addItem(user: User, cart: Cart): AuthorizerResponse {
    return user.id === cart.userId
  }

  updateItem(user: User, cart: Cart): AuthorizerResponse {
    return user.id === cart.userId
  }

  removeItem(user: User, cart: Cart): AuthorizerResponse {
    return user.id === cart.userId
  }

  clear(user: User, cart: Cart): AuthorizerResponse {
    return user.id === cart.userId
  }
}
