import { type Prisma } from '@prisma/client'
import { type RoomRepository } from '../interfaces/room.repository'
import { prisma } from '@/lib'

export class PrismaRoomRepository implements RoomRepository {
  createRoom = async (room: Prisma.RoomCreateInput) => {
    const createdRoom = await prisma.room.create({ data: room })
    return createdRoom
  }

  addAirConditionerToRoom = async (roomId: number, airConditioner: Prisma.AirConditionerCreateInput) => {
    const createdAirConditioner = await prisma.airConditioner.create({
      data: {
        ...airConditioner,
        room: {
          connect: {
            id: roomId
          }
        }
      }
    })
    return createdAirConditioner
  }
}
