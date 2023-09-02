import { PrismaRoomRepository } from '@/modules/room/repositories/prisma/prisma-room.repository'
import { PrismaAirConditionerRepository } from '../../repositories/prisma/prisma-air-conditioner.repository'
import { CreateAirConditionerController } from './create-air-conditioner.controller'

const airConditionerRepository = new PrismaAirConditionerRepository()
const roomRepository = new PrismaRoomRepository()
export const makeCreateAirConditionerControler = new CreateAirConditionerController(airConditionerRepository, roomRepository)
