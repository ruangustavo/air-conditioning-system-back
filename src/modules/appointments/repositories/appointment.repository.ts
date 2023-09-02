import { type Appointment, type Prisma } from '@prisma/client'

export interface AppointmentRepository {
  save: (appointment: Prisma.AppointmentUncheckedCreateInput) => Promise<Appointment>
}
