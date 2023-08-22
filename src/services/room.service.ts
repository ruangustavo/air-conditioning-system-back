import { type RoomRepository } from '@/repositories'
import { type Prisma } from '@prisma/client'

export class RoomService {
  constructor (private readonly roomRepository: RoomRepository) {}

  createRoom = async (room: Prisma.RoomCreateInput) => {
    const createdRoom = await this.roomRepository.createRoom(room)
    return createdRoom
  }

  addAirConditionerToRoom = async (roomId: number, airConditioner: Prisma.AirConditionerCreateInput) => {
    const createdAirConditioner = await this.roomRepository.addAirConditionerToRoom(roomId, airConditioner)
    return createdAirConditioner
  }

  getAirConditionersFromRoom = async (roomId: number) => {
    const airConditioners = await this.roomRepository.getAirConditionersFromRoom(roomId)
    return airConditioners
  }
}
