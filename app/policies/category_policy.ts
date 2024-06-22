import User from '#models/user'
// import Category from '#models/category'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Roles from '../enums/roles.js'

export default class CategoryPolicy extends BasePolicy {
  store(user: User): AuthorizerResponse {
    return user.roleId === Roles.MODERATOR
  }

  update(user: User): AuthorizerResponse {
    return user.roleId === Roles.MODERATOR
  }

  destroy(user: User): AuthorizerResponse {
    return user.roleId === Roles.MODERATOR
  }
}
