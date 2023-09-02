import { PrismaRoomRepository } from '../../repositories/prisma/prisma-room.repository'
import { CreateRoomController } from './create-room.controller'

const roomRepository = new PrismaRoomRepository()
export const makeCreateRoomController = new CreateRoomController(roomRepository)
