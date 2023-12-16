import { type Appointment, type Prisma } from '@prisma/client'
import { type AppointmentRepository } from '../appointment.repository'

export class InMemoryAppointmentRepository implements AppointmentRepository {
  appointments: Appointment[] = []

  save = async (appointment: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment> => {
    const createdAppointment: Appointment = {
      id: this.appointments.length + 1,
      is_recurrent: appointment.is_recurrent ?? false,
      end_day_of_week: appointment.end_day_of_week ?? appointment.start_day_of_week,
      ...appointment,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.appointments.push(createdAppointment)
    return createdAppointment
  }
}
