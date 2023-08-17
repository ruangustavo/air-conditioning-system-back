import express from 'express'
import { StateController } from '../controllers'
import { validateBodyRequest } from '../middlewares'
import { PrismaStateRepository } from '../repositories'
import { updateStateSchema } from '../schemas'
import { StateService } from '../services'

export const stateRouter = express.Router()

const stateRepository = new PrismaStateRepository()
const stateService = new StateService(stateRepository)
const stateController = new StateController(stateService)

stateRouter
  .route('/:id/state')
  .put(
    validateBodyRequest(updateStateSchema),
    stateController.updateAirConditionerState
  )

export default stateRouter
