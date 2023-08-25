import { type Prisma } from '@prisma/client'
import { type RoomRepository } from '../interfaces/room.repository'
import { prisma } from '@/lib'

export class PrismaRoomRepository implements RoomRepository {
  getRooms = async () => {
    const rooms = await prisma.room.findMany({
      include: {
        air_conditioners: true
      }
    })
    return rooms
  }

  getRoomById = async (id: number) => {
    const room = await prisma.room.findUnique({
      where: {
        id
      },
      include: {
        air_conditioners: true
      }
    })
    return room
  }

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

  getAirConditionersFromRoom = async (roomId: number) => {
    const airConditioners = await prisma.airConditioner.findMany({
      where: {
        room_id: roomId
      }
    })
    return airConditioners
  }
}
