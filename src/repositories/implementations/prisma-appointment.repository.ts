import { prisma } from '@/lib'
import { type AppointmentRepository, type CreateAppointmentData } from '../interfaces/appointment.repository'

export class PrismaAppointmentRepository implements AppointmentRepository {
  create = async (airConditionerId: number, appointment: CreateAppointmentData) => {
    const createdAppointment = await prisma.appointment.create({
      data: {
        ...appointment,
        air_conditioner: {
          connect: {
            id: airConditionerId
          }
        }
      }
    })

    return createdAppointment
  }
}
