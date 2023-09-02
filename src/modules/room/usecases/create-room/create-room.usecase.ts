import { type RoomRepository } from '../../repositories/room.repository'

interface CreateRoomUsecaseRequest {
  name: string
  description?: string
}

export class CreateRoomUsecase {
  constructor (
    private readonly roomRepository: RoomRepository
  ) {}

  async execute ({ name, description }: CreateRoomUsecaseRequest) {
    const room = await this.roomRepository.save({ name, description })
    return room
  }
}
