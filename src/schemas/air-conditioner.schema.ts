import { z } from 'zod'

export const createAirConditionerSchema = z.object({
  brand: z.string(),
  model: z.string()
})

export const updateAirConditionerSchema = createAirConditionerSchema.partial()

export const deleteAirConditionerSchema = z.object({
  id: z.number()
})

export const updateAirConditionerStateSchema = z.object({
  state: z.boolean()
})
