import { type RoomRepository } from '../../repositories/room.repository'

export class FindRoomsUsecase {
  constructor (
    private readonly roomRepository: RoomRepository
  ) {}

  async execute () {
    const rooms = await this.roomRepository.findAll()
    return rooms
  }
}
