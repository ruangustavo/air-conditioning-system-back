import { makeCreateAppointmentController } from '@/modules/appointments/usecases/create-appointment'
import { type Request, type Response, Router } from 'express'

export const appointmentRoutes = Router()

appointmentRoutes.post('/rooms/:roomId/appointments', async (req: Request, res: Response) => {
  await makeCreateAppointmentController.handle(req, res)
})
