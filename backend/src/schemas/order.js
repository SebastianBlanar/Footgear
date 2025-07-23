import z from "zod"

const orderSchema = z.object({
  customer_id: z.string().uuid("ID de cliente inválido"),
  total_amount: z.number().positive("El monto debe ser mayor a cero"),
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']).optional(),
  payment_status: z.enum(['pending', 'paid', 'failed']).optional(),
})

export function validateOrder(input) {
  return orderSchema.safeParse(input)
}

export function validatePartialOrder(input) {
  return orderSchema.partial().safeParse(input)
}