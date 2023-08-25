import { type Appointment, type Prisma } from '@prisma/client'

export interface AppointmentRepository {
  createAppointment: (airConditionerId: number, appointment: Prisma.AppointmentCreateInput) => Promise<Appointment>
}
