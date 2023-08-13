import { z } from 'zod'

export const createAirConditionerSchema = z.object({
  brand: z.string().nonempty(),
  model: z.string().nonempty()
})

export const updateAirConditionerSchema = createAirConditionerSchema.partial()
