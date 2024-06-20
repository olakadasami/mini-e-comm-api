import vine from '@vinejs/vine'

export const addNewCartItemValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !user
    }),
    productId: vine.number().exists(async (db, value) => {
      const product = await db.from('products').where('id', value).first()
      return !product
    }),
    quantity: vine.number(),
  })
)
