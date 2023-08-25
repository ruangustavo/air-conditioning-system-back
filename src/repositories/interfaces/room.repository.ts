import { type Room, type Prisma, type AirConditioner } from '@prisma/client'

export interface RoomRepository {
  getRooms: () => Promise<Room[]>
  getRoomById: (id: number) => Promise<Room | null>
  createRoom: (room: Prisma.RoomCreateInput) => Promise<Room>
  addAirConditionerToRoom: (roomId: number, airConditioner: Prisma.AirConditionerCreateInput) => Promise<AirConditioner>
  getAirConditionersFromRoom: (roomId: number) => Promise<AirConditioner[]>
}
