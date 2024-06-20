import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    categoryId: vine.number().exists(async (db, value) => {
      const category = await db.from('categories').where('id', value).first()
      return !category
    }),
    name: vine.string(),
    description: vine.string(),
    price: vine.number(),
    stockQuantity: vine.number(),
  })
)
