import { RoomController } from '@/controllers'
import { validateBodyRequest } from '@/middlewares'
import { PrismaRoomRepository } from '@/repositories'
import { createAirConditionerSchema, createRoomSchema } from '@/schemas'
import { RoomService } from '@/services'
import express from 'express'

export const roomRouter = express.Router()

const repository = new PrismaRoomRepository()
const service = new RoomService(repository)
const controller = new RoomController(service)

roomRouter.post(
  '/',
  validateBodyRequest(createRoomSchema),
  controller.createRoom
)

roomRouter.get(
  '/:id/air-conditioners',
  controller.getAirConditionersFromRoom
)

roomRouter.post(
  '/:id/air-conditioners',
  validateBodyRequest(createAirConditionerSchema),
  controller.addAirConditionerToRoom
)
