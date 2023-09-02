import { type Request, type Response } from 'express'
import { type AirConditionerRepository } from '../../repositories/air-conditioner.repository'
import { ZodError, z } from 'zod'

const updateAirConditionerStatePathParamsSchema = z.object({
  id: z.coerce.number()
})

export class UpdateAirConditionerStateController {
  constructor (
    private readonly airConditionerRepository: AirConditionerRepository
  ) {}

  async handle (req: Request, res: Response) {
    try {
      const { id } = updateAirConditionerStatePathParamsSchema.parse(req.params)
      const { state } = req.body

      const roomUpdated = await this.airConditionerRepository.updateStateById(id, state)
      res.status(200).json({ air_conditioner: roomUpdated })
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.issues })
      }
    }
  }
}
