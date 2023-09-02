import { makeCreateRoomController } from '@/modules/room/usecases/create-room'
import { makeFindRoomsController } from '@/modules/room/usecases/find-rooms'
import { Router } from 'express'

export const roomRoutes = Router()

roomRoutes.get('/rooms', async (req, res) => {
  await makeFindRoomsController.handle(req, res)
})

roomRoutes.post('/rooms', async (req, res) => {
  await makeCreateRoomController.handle(req, res)
})
