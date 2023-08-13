import { ResourceNotFound } from '@/errors'
import { idSchema } from '@/schemas'
import { type AirConditionerStateService } from '@/services'
import { type Request, type Response } from 'express'
import { ZodError } from 'zod'

export class AirConditionerStateController {
  constructor (
    private readonly airConditionerStateService: AirConditionerStateService
  ) {}

  updateAirConditionerState = async (req: Request, res: Response) => {
    try {
      const { id } = idSchema.parse(req.params)
      const { state }: { state: boolean } = req.validatedData
      await this.airConditionerStateService.updateState(id, state)
      res.json({ success: true })
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.message })
      } else if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }
}
