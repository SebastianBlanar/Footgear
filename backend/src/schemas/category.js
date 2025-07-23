import z from 'zod'
const categorySchema = z.object({
  name: z.string({
    invalid_type_error: 'Product name must be a string',
    required_error: "Product name is required"
  }),
  image: z.string().url({
    required_error: "Product image is a required field",
    invalid_type_error: "The product image must be a valid URL"
  }),
})
export function validateCategory(input){
  return categorySchema.safeParse(input)
}
export function validateCategoryPartial(input){
  return categorySchema.partial().safeParse(input)
}
