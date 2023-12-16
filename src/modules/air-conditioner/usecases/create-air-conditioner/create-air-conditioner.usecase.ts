import { type RoomRepository } from '@/modules/room/repositories/room.repository'
import { type AirConditionerRepository } from '../../repositories/air-conditioner.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

interface CreateAirConditionerUsecaseRequest {
  roomId: number
  brand: string
  model: string
}

export class CreateAirConditionerUsecase {
  constructor (
    private readonly airConditionerRepository: AirConditionerRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  async execute ({ roomId, brand, model }: CreateAirConditionerUsecaseRequest) {
    const existingRoom = await this.roomRepository.findById(roomId)
    if (existingRoom === null) {
      throw new ResourceNotFoundError('Room not found')
    }

    const createdAirConditioner = await this.airConditionerRepository.save({ room_id: roomId, brand, model })
    return createdAirConditioner
  }
}
