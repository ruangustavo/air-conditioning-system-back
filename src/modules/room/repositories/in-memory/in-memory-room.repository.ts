import { type Room, type Prisma } from '@prisma/client'
import { type RoomRepository } from '../room.repository'

export class InMemoryRoomRepository implements RoomRepository {
  rooms: Room[] = []

  save = async (room: Prisma.RoomCreateInput): Promise<Room> => {
    const createdRoom: Room = {
      id: this.rooms.length + 1,
      name: room.name,
      description: room.description ?? null,
      updated_at: new Date(),
      created_at: new Date()
    }

    this.rooms.push(createdRoom)
    return createdRoom
  }

  findAll = async (): Promise<Room[]> => {
    return this.rooms
  }

  findById = async (id: number): Promise<Room | null> => {
    const room = this.rooms.find(room => room.id === id)
    return room ?? null
  }
}
