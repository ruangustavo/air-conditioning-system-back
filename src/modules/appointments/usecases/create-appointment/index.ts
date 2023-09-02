import { PrismaRoomRepository } from '@/modules/room/repositories/prisma/prisma-room.repository'
import { CreateAppointmentController } from './create-appointment.controller'
import { PrismaAirConditionerRepository } from '@/modules/air-conditioner/repositories/prisma/prisma-air-conditioner.repository'
import { PrismaAppointmentRepository } from '../../repositories/prisma/prisma-appointment.repository'

const appointmentRepository = new PrismaAppointmentRepository()
const roomRepository = new PrismaRoomRepository()
const airConditionerRepository = new PrismaAirConditionerRepository()

export const makeCreateAppointmentController = new CreateAppointmentController(
  appointmentRepository, roomRepository, airConditionerRepository
)
