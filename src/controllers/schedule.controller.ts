import { idSchema } from '@/schemas'
import { type ScheduleService } from '@/services'
import { type Request, type Response } from 'express'
import { ZodError } from 'zod'

export class ScheduleController {
  constructor (private readonly scheduleService: ScheduleService) {}

  createSchedule = async (req: Request, res: Response) => {
    try {
      const { id } = idSchema.parse(req.params)
      const createdSchedule = await this.scheduleService.create(id, req.validatedData)
      res.status(201).json({ schedule: createdSchedule })
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
