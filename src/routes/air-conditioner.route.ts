import express from 'express'
import { AirConditionerController } from '../controllers'

import { validateBodyRequest } from '../middlewares'
import { PrismaAirConditionerRepository } from '../repositories'
import {
  createAirConditionerSchema,
  deleteAirConditionerSchema,
  updateAirConditionerSchema,
  updateAirConditionerStateSchema
} from '../schemas'
import { AirConditionerService } from '../services'

const router = express.Router()

const prismaAirConditionerRepository = new PrismaAirConditionerRepository()
const airConditionerService = new AirConditionerService(
  prismaAirConditionerRepository
)
const airConditionerController = new AirConditionerController(
  airConditionerService
)

router
  .route('/')
  .get(airConditionerController.getAllAirConditioners)
  .post(
    validateBodyRequest(createAirConditionerSchema),
    airConditionerController.createAirConditioner
  )

router
  .route('/:id')
  .put(
    validateBodyRequest(updateAirConditionerSchema),
    airConditionerController.updateOneAirConditioner
  )
  .delete(
    validateBodyRequest(deleteAirConditionerSchema),
    airConditionerController.deleteOneAirConditioner
  )

router
  .route('/:id/state')
  .put(
    validateBodyRequest(updateAirConditionerStateSchema),
    airConditionerController.updateOneAirConditionerState
  )

export default router
