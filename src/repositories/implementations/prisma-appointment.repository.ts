import { prisma } from '@/lib'
import { type AppointmentRepository } from '../interfaces/appointment.repository'
import { type Prisma } from '@prisma/client'

export class PrismaAppointmentRepository implements AppointmentRepository {
  createAppointment = async (roomId: number, appointment: Prisma.AppointmentCreateInput) => {
    const createdAppointment = await prisma.appointment.create({
      data: {
        ...appointment,
        room: {
          connect: {
            id: roomId
          }
        }
      }
    })

    return createdAppointment
  }
}
