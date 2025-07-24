import { z } from 'zod'

const purchaseSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),  
  phone: z.string().min(6),
  address: z.string().min(1),
  items: z.array(
    z.object({
      stock_id: z.number().int().positive(),
      price : z.number().positive(),
      quantity : z.number().int().positive()
    })
  ),
  total_amount : z.number()
})

export function validatePurchase(input){
  return purchaseSchema.safeParse(input)
}
