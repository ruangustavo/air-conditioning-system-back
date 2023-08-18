import { z } from 'zod'

export const createScheduleSchema = z.object({
  start_day_of_week: z.number().min(0).max(6).refine(val => val < new Date().getDay(), {
    message: '"start_day_of_week" must be less than current day of week'
  }),
  end_day_of_week: z.number().min(0).max(6).optional(),
  is_recurrent: z.boolean(),
  hour: z.number().min(0).max(23),
  minute: z.number().min(1).max(59),
  state: z.boolean()
})
  .refine(data => data.end_day_of_week === undefined || data.end_day_of_week >= data.start_day_of_week, {
    message: '"end_day_of_week" must be greater than or equal to "start_day_of_week"'
  })
