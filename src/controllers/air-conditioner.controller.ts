import { type Request, type Response } from 'express'
import { type AirConditionerService } from '@/services'

/**
 * This controller is responsible for handling the requests for the air-conditioners.
 * It is used by the routes to get the data from the services.
 */

export class AirConditionerController {
  constructor (private readonly airConditionerService: AirConditionerService) {}

  getAllAirConditioners = async (_req: Request, res: Response) => {
    const airConditioners = await this.airConditionerService.getAll()
    res.json(airConditioners)
  }

  getOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const airConditioner = await this.airConditionerService.getOne(id)
    res.json(airConditioner)
  }

  createAirConditioner = async (req: Request, res: Response) => {
    const airConditioner = req.validatedData
    const newAirConditioner = await this.airConditionerService.create(
      airConditioner
    )
    res.json(newAirConditioner)
  }

  updateOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const airConditioner = req.validatedData
    const updatedAirConditioner = await this.airConditionerService.update(
      id,
      airConditioner
    )
    res.json(updatedAirConditioner)
  }

  deleteOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const deletedAirConditioner = await this.airConditionerService.delete(id)
    res.json(deletedAirConditioner)
  }
}
