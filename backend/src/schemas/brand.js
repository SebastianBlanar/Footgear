import z from 'zod'
const brandSchema = z.object({
  name: z.string({
    invalid_type_error: 'Product name must be a string',
    required_error: "Product name is required"
  }),
  image: z.string().url({
    required_error: "Product image is a required field",
    invalid_type_error: "The product image must be a valid URL"
  }),
})
export function validateBrand(input){
  return brandSchema.safeParse(input)
}
export function validateBrandPartial(input){
  return brandSchema.partial().safeParse(input)
}
