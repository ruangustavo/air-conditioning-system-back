import { ResourceNotFound } from '@/errors'
import { idSchema } from '@/schemas'
import { type AppointmentService } from '@/services'
import { type Request, type Response } from 'express'

export class AppointmentController {
  constructor (private readonly appointmentService: AppointmentService) {}

  createAppointment = async (req: Request, res: Response) => {
    const parsedParams = idSchema.safeParse(req.params)

    if (!parsedParams.success) {
      return res.status(400).json(
        {
          message: 'Validation error', error: parsedParams.error.format()
        }
      )
    }

    const { id } = parsedParams.data

    try {
      const createdAppointment = await this.appointmentService.createAppointment(id, req.validatedData)
      res.status(201).json({ appointment: createdAppointment })
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ message: error.message })
      }
    }
  }
}
