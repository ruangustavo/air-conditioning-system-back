import { idSchema } from '@/schemas'
import { type AppointmentService } from '@/services'
import { type Request, type Response } from 'express'
import { ZodError } from 'zod'

export class AppointmentController {
  constructor (private readonly appointmentService: AppointmentService) {}

  createAppointment = async (req: Request, res: Response) => {
    try {
      const { id } = idSchema.parse(req.params)
      const createdAppointment = await this.appointmentService.create(id, req.validatedData)
      res.status(201).json({ appointment: createdAppointment })
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation error.',
          errors: error.format()
        })
      }
    }
  }
}
