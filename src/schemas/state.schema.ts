import { z } from 'zod'

export const updateStateSchema = z.object({
  state: z.boolean()
})
