import { AppointmentController } from '@/controllers'
import { validateBodyRequest } from '@/middlewares'
import { PrismaAppointmentRepository, PrismaStateRepository } from '@/repositories'
import { createAppointmentSchema } from '@/schemas/appointment.schema'
import { AppointmentService, StateService } from '@/services'
import express from 'express'

export const appointmentRouter = express.Router()

const stateRepository = new PrismaStateRepository()
const stateService = new StateService(stateRepository)

const appointmentRepository = new PrismaAppointmentRepository()
const appointmentService = new AppointmentService(appointmentRepository, stateService)
const appointmentController = new AppointmentController(appointmentService)

appointmentRouter
  .route('/:id/appointment')
  .post(
    validateBodyRequest(createAppointmentSchema),
    appointmentController.createAppointment
  )
