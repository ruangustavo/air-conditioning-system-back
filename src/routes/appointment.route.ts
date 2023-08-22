import { AppointmentController } from '@/controllers'
import { validateBodyRequest } from '@/middlewares'
import { PrismaAirConditionerRepository, PrismaAppointmentRepository, PrismaRoomRepository } from '@/repositories'
import { createAppointmentSchema } from '@/schemas'
import { AppointmentService } from '@/services'
import express from 'express'

export const appointmentRouter = express.Router()

const roomRepository = new PrismaRoomRepository()
const appointmentRepository = new PrismaAppointmentRepository()
const airConditionerRepository = new PrismaAirConditionerRepository()

const service = new AppointmentService(appointmentRepository, airConditionerRepository, roomRepository)
const controller = new AppointmentController(service)

appointmentRouter
  .route('/:id/appointment')
  .post(
    validateBodyRequest(createAppointmentSchema),
    controller.createAppointment
  )
