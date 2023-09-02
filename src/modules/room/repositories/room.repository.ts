import { type Prisma, type Room } from '@prisma/client'

export interface RoomRepository {
  save: (room: Prisma.RoomCreateInput) => Promise<Room>
  findAll: () => Promise<Room[]>
  findById: (id: number) => Promise<Room | null>
}
