import { ScheduleController } from '@/controllers'
import { validateBodyRequest } from '@/middlewares'
import { PrismaScheduleRepository, PrismaStateRepository } from '@/repositories'
import { createScheduleSchema } from '@/schemas/schedule.schema'
import { ScheduleService, StateService } from '@/services'
import express from 'express'

export const scheduleRouter = express.Router()

const stateRepository = new PrismaStateRepository()
const stateService = new StateService(stateRepository)

const scheduleRepository = new PrismaScheduleRepository()
const scheduleService = new ScheduleService(scheduleRepository, stateService)
const scheduleController = new ScheduleController(scheduleService)

scheduleRouter
  .route('/:id/schedule')
  .post(
    validateBodyRequest(createScheduleSchema),
    scheduleController.createSchedule
  )
