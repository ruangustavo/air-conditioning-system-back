import { type Schedule } from '@/models'
import { type createScheduleSchema } from '@/schemas/schedule.schema'
import { type z } from 'zod'

export type CreateScheduleData = z.infer<typeof createScheduleSchema>

export interface ScheduleRepository {
  create: (airConditionerId: number, schedule: CreateScheduleData) => Promise<Schedule>
}
