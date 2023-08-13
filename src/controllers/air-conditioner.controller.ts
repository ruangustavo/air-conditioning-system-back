import { type Request, type Response } from 'express'
import { type AirConditionerService } from '@/services'
import { ResourceNotFound } from '@/errors'
import { idSchema } from '@/schemas'
import { ZodError } from 'zod'

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
    try {
      const { id } = idSchema.parse(req.params)
      const airConditioner = await this.airConditionerService.getOne(id)
      res.json(airConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      } else if (error instanceof ZodError) {
        res.status(400).json({ message: 'Validation error', error: error.format() })
      }
    }
  }

  createAirConditioner = async (req: Request, res: Response) => {
    const airConditioner = req.validatedData
    const newAirConditioner = await this.airConditionerService.create(
      airConditioner
    )
    res.status(201).json(newAirConditioner)
  }

  updateOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const airConditioner = req.validatedData

    try {
      const updatedAirConditioner = await this.airConditionerService.update(id, airConditioner)
      res.json(updatedAirConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }

  deleteOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const deletedAirConditioner = await this.airConditionerService.delete(id)
      res.json(deletedAirConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }
}
