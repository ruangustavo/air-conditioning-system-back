import { makeCreateAirConditionerControler } from '@/modules/air-conditioner/usecases/create-air-conditioner'
import { makeUpdateAirConditionerStateController } from '@/modules/air-conditioner/usecases/update-air-conditioner-state'
import { type Request, type Response, Router } from 'express'

export const airConditionerRoutes = Router()

airConditionerRoutes.post('/rooms/:roomId/air-conditioners', async (req: Request, res: Response) => {
  await makeCreateAirConditionerControler.handle(req, res)
})

airConditionerRoutes.put('/air-conditioners/:id/state', async (req: Request, res: Response) => {
  await makeUpdateAirConditionerStateController.handle(req, res)
})
