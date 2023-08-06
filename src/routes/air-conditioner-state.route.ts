import express from 'express'
import { AirConditionerStateController } from '../controllers'

import { validateBodyRequest } from '../middlewares'
import { PrismaAirConditionerRepository } from '../repositories'
import {
  updateAirConditionerStateSchema
} from '../schemas'
import { AirConditionerStateService } from '../services'

export const airConditionerStateRouter = express.Router()

const prismaAirConditionerRepository = new PrismaAirConditionerRepository()
const airConditionerStateService = new AirConditionerStateService(
  prismaAirConditionerRepository
)
const airConditionerStateController = new AirConditionerStateController(
  airConditionerStateService
)

airConditionerStateRouter
  .route('/:id/state')
  .put(
    validateBodyRequest(updateAirConditionerStateSchema),
    airConditionerStateController.updateAirConditionerState
  )

export default airConditionerStateRouter
