import { prisma } from '@/lib'
import { type ScheduleRepository, type CreateScheduleData } from '../interfaces/schedule.repository'

export class PrismaScheduleRepository implements ScheduleRepository {
  create = async (airConditionerId: number, schedule: CreateScheduleData) => {
    const createdSchedule = await prisma.schedule.create({
      data: {
        ...schedule,
        air_conditioner: {
          connect: {
            id: airConditionerId
          }
        }
      }
    })

    return createdSchedule
  }
}
