/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const EmailController = () => import('#controllers/auth/email_controller')
const PasswordResetController = () => import('#controllers/auth/password_reset_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const SocialsController = () => import('#controllers/auth/socials_controller')
const UsersController = () => import('#controllers/users_controller')
const ProductController = () => import('#controllers/product_controller')
const OrdersController = () => import('#controllers/orders_controller')
const CartController = () => import('#controllers/cart_controller')
const CategoryController = () => import('#controllers/category_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/**
 * OAuth Routes
 */
router.get(':provider/callback', [SocialsController, 'redirect'])
router.get(':provider/redirect', [SocialsController, 'callback'])

/**
 * Email VErification Routes
 */
router.post('forgot-password', [PasswordResetController, 'forgot'])
router.get('reset-password/:token', [PasswordResetController, 'show']).as('password.reset.show')
router.post('reset-password/:token', [PasswordResetController, 'reset']).as('password.reset.store')
router.get('verify-email/:token', [EmailController, 'confirm'])

/**
 * API routes
 */
router
  .group(() => {
    /**
     * API Version 1
     */
    router
      .group(() => {
        /**
         * Authentication Routes
         */
        router
          .group(() => {
            router.post('/login', [LoginController]).as('login')
            router.post('/register', [RegisterController]).as('register')
            router.post('/logout', [LogoutController]).as('logout').use(middleware.auth())
          })
          .as('auth')
          .prefix('auth')

        /**
         * Users Routes
         */
        router.resource('users', UsersController).apiOnly().as('users').use('*', middleware.auth())

        /**
         * Products Routes
         */
        router
          .resource('products', ProductController)
          .apiOnly()
          .as('products')
          .use(['destroy', 'store', 'update'], middleware.auth())

        /**
         * Orders Routes
         */
        router
          .resource('orders', OrdersController)
          .apiOnly()
          .as('orders')
          .use('*', middleware.auth())

        /**
         * Category Routes
         */
        router
          .resource('categories', CategoryController)
          .apiOnly()
          .as('categories')
          .use(['destroy', 'store', 'update'], middleware.auth())

        /**
         * Cart Routes
         */
        router
          .group(() => {
            router.get(':user_id', [CartController, 'show']).as('show')
            router.post('add-item', [CartController, 'addItem']).as('addItem')
            router.put('update-item/:id', [CartController, 'updateItem']).as('updateItem')
            router.delete('remove-item/:id', [CartController, 'removeItem']).as('removeItem')
            router.delete('clear/:user_id', [CartController, 'clear']).as('clear')
          })
          .as('carts')
          .prefix('carts')
          .use(middleware.auth())
      })
      .prefix('v1')
  })
  .prefix('api')
