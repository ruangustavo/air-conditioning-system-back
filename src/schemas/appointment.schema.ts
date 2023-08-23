import { z } from 'zod'

export const createAppointmentSchema = z.object({
  start_day_of_week: z.number().min(0).max(6),
  end_day_of_week: z.number().min(0).max(6).optional(),
  is_recurrent: z.boolean(),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  state: z.boolean()
})
  .transform(data => ({
    ...data,
    end_day_of_week: data.end_day_of_week ?? data.start_day_of_week
  }))
  .refine(data => data.start_day_of_week <= data.end_day_of_week, {
    message: 'start_day_of_week must be less than or equal to end_day_of_week'
  })
