import { PrismaAirConditionerRepository } from '../../repositories/prisma/prisma-air-conditioner.repository'
import { UpdateAirConditionerStateController } from './update-air-conditioner-state.controller'

const airConditionerRepository = new PrismaAirConditionerRepository()
export const makeUpdateAirConditionerStateController = new UpdateAirConditionerStateController(airConditionerRepository)
