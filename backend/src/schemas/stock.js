import z from "zod"

const stockSchema = z.object({
  product_id : z.string().uuid(),
  size : z.number().int().min(30).max(50),
  quantity : z.number().int()
})

export function validateStock(input){
  return stockSchema.safeParse(input)
}
export function validatePartialStock(input){
  return stockSchema.partial().safeParse(input)
}