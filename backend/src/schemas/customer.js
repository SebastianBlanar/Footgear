import z from "zod"

const customerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  address: z.string().min(5, "La dirección debe ser más larga"),
  phone: z
    .string()
    .min(8, "El teléfono es muy corto")
    .regex(/^[+0-9\s()-]+$/, "Formato de teléfono inválido"),  
})

export function validateCustomer(input) {
  return customerSchema.safeParse(input)
}

export function validatePartialCustomer(input) {
  return customerSchema.partial().safeParse(input)
}
