import { z } from 'zod'

export const createAppointmentSchema = z.object({
  start_day_of_week: z.number().min(0).max(6),
  end_day_of_week: z.number().min(0).max(6).optional(),
  is_recurrent: z.boolean(),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  state: z.boolean()
})
