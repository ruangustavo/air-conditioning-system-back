import { prisma } from '@/lib'
import { type AppointmentRepository } from '../interfaces/appointment.repository'
import { type Prisma } from '@prisma/client'

export class PrismaAppointmentRepository implements AppointmentRepository {
  createAppointment = async (airConditionerId: number, appointment: Prisma.AppointmentCreateInput) => {
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
