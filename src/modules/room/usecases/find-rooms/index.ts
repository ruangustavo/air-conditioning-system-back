import { PrismaRoomRepository } from '../../repositories/prisma/prisma-room.repository'
import { FindRoomsController } from './find-rooms.controller'

const roomRepository = new PrismaRoomRepository()
export const makeFindRoomsController = new FindRoomsController(roomRepository)
