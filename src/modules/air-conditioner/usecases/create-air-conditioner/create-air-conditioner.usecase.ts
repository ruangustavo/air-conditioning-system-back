import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { mqttClient } from '@/infra/mqtt/mqtt'
import { type RoomRepository } from '@/modules/room/repositories/room.repository'
import { type AirConditionerRepository } from '../../repositories/air-conditioner.repository'

interface CreateAirConditionerUsecaseRequest {
  roomId: number
  brand: string
  model: string
  protocol: string
}

export class CreateAirConditionerUsecase {
  constructor (
    private readonly airConditionerRepository: AirConditionerRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  async execute ({ roomId, brand, model, protocol }: CreateAirConditionerUsecaseRequest) {
    const existingRoom = await this.roomRepository.findById(roomId)
    if (existingRoom === null) {
      throw new ResourceNotFoundError('Room not found')
    }

    const createdAirConditioner = await this.airConditionerRepository.save({ room_id: roomId, brand, model, protocol })

    mqttClient.publish('air-conditioners/create', JSON.stringify({
      action: 'create',
      data: {
        id: createdAirConditioner.id,
        protocol: createdAirConditioner.protocol
      }
    }))

    return createdAirConditioner
  }
}
