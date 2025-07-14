import z from 'zod'

const StockItemSchema = z.object({
  size: z.number().int().gte(30).lte(50),
  quantity: z.number().int().nonnegative()
})
const StockSchema = z.record(
  z.string().min(1, 'Color name cannot be empty'),
  z.array(StockItemSchema).min(1, 'Each color must have at least one size')
)

const productsSchema = z.object({
    name : z.string({
      invalid_type_error : 'Product name must be a string',
      required_error : "Product name is required"
    }),
    brand : z.string(),
    price : z.number().int().min(50).max(300),
    category : z.string(),
    image : z.string().url({
      required_error : "Product image is a required field",
      invalid_type_error : "The product image must be a valid URL"
    }),
    stock : StockSchema
  })

export function validateProduct( input ){
  return productsSchema.safeParse(input)
}
export function validateProductPartial(input){
  return productsSchema.partial().safeParse(input)
}