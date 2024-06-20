import User from '#models/user'
import Cart from '#models/cart'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

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
