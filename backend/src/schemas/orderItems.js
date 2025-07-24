import z from "zod"

export const orderItemSchema = z.object({
  order_id : z.string().uuid(),
  stock_id: z.number().int(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
})

export function validateOrderItems(input){
  return orderItemSchema.safeParse(input)
}
export function validatePartialOrderItems(input){
  return orderItemSchema.partial().safeParse(input)
}
