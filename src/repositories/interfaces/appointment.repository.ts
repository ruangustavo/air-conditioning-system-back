import { type Appointment } from '@/models'
import { type createAppointmentSchema } from '@/schemas/appointment.schema'
import { type z } from 'zod'

export type CreateAppointmentData = z.infer<typeof createAppointmentSchema>

export interface AppointmentRepository {
  create: (airConditionerId: number, appointment: CreateAppointmentData) => Promise<Appointment>
}
