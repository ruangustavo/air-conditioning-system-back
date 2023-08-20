import { prisma } from '@/lib'
import { type UpdateStateData, type StateRepository } from '../interfaces/state.repository'

export class PrismaStateRepository implements StateRepository {
  updateAirConditionerState = async (airConditionerId: number, state: UpdateStateData) => {
    const updatedState = await prisma.state.create({
      data: {
        ...state,
        air_conditioner: {
          connect: {
            id: airConditionerId
          }
        }
      }
    })
    return updatedState
  }
}
