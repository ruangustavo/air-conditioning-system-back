import { z } from 'zod'

export const createRoomSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty().optional()
})
