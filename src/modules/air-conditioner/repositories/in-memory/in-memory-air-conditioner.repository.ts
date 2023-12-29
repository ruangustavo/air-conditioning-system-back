import { type Prisma, type AirConditioner } from '@prisma/client'
import { type AirConditionerRepository } from '../air-conditioner.repository'

export class InMemoryAirConditionerRepository implements AirConditionerRepository {
  airConditioners: AirConditioner[] = []

  save = async (airConditioner: Prisma.AirConditionerUncheckedCreateInput) => {
    const createdAirConditioner: AirConditioner = {
      id: this.airConditioners.length + 1,
      ...airConditioner,
      is_active: false,
      protocol: 'any_protocol',
      created_at: new Date(),
      updated_at: new Date()
    }

    this.airConditioners.push(createdAirConditioner)
    return createdAirConditioner
  }

  findAllByRoomId = async (roomId: number): Promise<AirConditioner[]> => {
    const airConditioners = this.airConditioners.filter(
      airConditioner => airConditioner.room_id === roomId
    )
    return airConditioners
  }

  updateStateById = async (id: number, state: boolean): Promise<AirConditioner> => {
    const airConditionerIndex = this.airConditioners.findIndex(
      airConditioner => airConditioner.id === id
    )

    const airConditioner = this.airConditioners[airConditionerIndex]
    const updatedAirConditioner = {
      ...airConditioner,
      is_active: state,
      updated_at: new Date()
    }

    this.airConditioners[airConditionerIndex] = updatedAirConditioner
    return updatedAirConditioner
  }
}
