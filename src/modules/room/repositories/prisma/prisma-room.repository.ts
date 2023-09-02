import { prisma } from '@/infra/database/prisma'
import { RoomRepository } from '../room.repository'
import { Prisma } from '@prisma/client'

export class PrismaRoomRepository implements RoomRepository {
  save = async (room: Prisma.RoomCreateInput) => {
    const createdRoom = await prisma.room.create({ data: room })
    return createdRoom
  }

  findAll = async () => {
    const rooms = await prisma.room.findMany(
      {
        include: {
          air_conditioners: true,
        }
      }
    )
    return rooms
  }

  findById = async (id: number) => {
    const room = await prisma.room.findUnique(
      {
        where: {
          id
        },
        include: {
          air_conditioners: true,
        }
      }
    )

    return room
  }

  findAirConditionersById = async (id: number) => {
    const room = await prisma.room.findUnique(
      {
        where: {
          id
        },
        include: {
          air_conditioners: true,
        }
      }
    )

    return room?.air_conditioners ?? []
  }
}
