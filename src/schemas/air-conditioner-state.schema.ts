import { z } from 'zod'

export const updateAirConditionerStateSchema = z.object({
  state: z.boolean()
})
