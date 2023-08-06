import { type AirConditionerStateService } from '@/services'
import { type Request, type Response } from 'express'

export class AirConditionerStateController {
  constructor (
    private readonly airConditionerStateService: AirConditionerStateService
  ) {}

  updateAirConditionerState = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { state }: { state: boolean } = req.validatedData
    await this.airConditionerStateService.updateState(id, state)
    res.json({ success: true })
  }
}
