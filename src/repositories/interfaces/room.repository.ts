import { type Room, type Prisma, type AirConditioner } from '@prisma/client'

export interface RoomRepository {
  createRoom: (room: Prisma.RoomCreateInput) => Promise<Room>
  addAirConditionerToRoom: (roomId: number, airConditioner: Prisma.AirConditionerCreateInput) => Promise<AirConditioner>
  getAirConditionersFromRoom: (roomId: number) => Promise<AirConditioner[]>
}
