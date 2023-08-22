import express from 'express'
import { AirConditionerController } from '../controllers'
import { validateBodyRequest } from '../middlewares'
import { PrismaAirConditionerRepository } from '../repositories'
import {
  updateAirConditionerSchema,
  updateAirConditionerStateSchema
} from '../schemas'
import { AirConditionerService } from '../services'

export const airConditionerRouter = express.Router()

const repository = new PrismaAirConditionerRepository()
const service = new AirConditionerService(repository)
const controller = new AirConditionerController(service)

airConditionerRouter
  .route('/')
  .get(controller.getAllAirConditioners)

airConditionerRouter
  .route('/:id')
  .get(controller.getAirConditionerById)
  .put(
    validateBodyRequest(updateAirConditionerSchema),
    controller.updateAirConditioner
  )
  .delete(
    controller.deleteAirConditioner
  )

airConditionerRouter
  .route('/:id/state')
  .put(validateBodyRequest(updateAirConditionerStateSchema), controller.updateAirConditionerState)
