import { AppointmentController } from '@/controllers'
import { validateBodyRequest } from '@/middlewares'
import { PrismaAirConditionerRepository, PrismaAppointmentRepository } from '@/repositories'
import { createAppointmentSchema } from '@/schemas'
import { AppointmentService } from '@/services'
import express from 'express'

export const appointmentRouter = express.Router()

const airConditionerRepository = new PrismaAirConditionerRepository()
const appointmentRepository = new PrismaAppointmentRepository()
const service = new AppointmentService(appointmentRepository, airConditionerRepository)
const controller = new AppointmentController(service)

appointmentRouter
  .route('/:id/appointment')
  .post(
    validateBodyRequest(createAppointmentSchema),
    controller.createAppointment
  )
