import express from 'express'
import { AirConditionerController } from '../controllers'

import { validateBodyRequest } from '../middlewares'
import { PrismaAirConditionerRepository } from '../repositories'
import {
  createAirConditionerSchema,
  deleteAirConditionerSchema,
  updateAirConditionerSchema
} from '../schemas'
import { AirConditionerService } from '../services'

export const airConditionerRouter = express.Router()

const prismaAirConditionerRepository = new PrismaAirConditionerRepository()
const airConditionerService = new AirConditionerService(
  prismaAirConditionerRepository
)
const airConditionerController = new AirConditionerController(
  airConditionerService
)

airConditionerRouter
  .route('/')
  .get(airConditionerController.getAllAirConditioners)
  .post(
    validateBodyRequest(createAirConditionerSchema),
    airConditionerController.createAirConditioner
  )

airConditionerRouter
  .route('/:id')
  .put(
    validateBodyRequest(updateAirConditionerSchema),
    airConditionerController.updateOneAirConditioner
  )
  .delete(
    validateBodyRequest(deleteAirConditionerSchema),
    airConditionerController.deleteOneAirConditioner
  )

export default airConditionerRouter
