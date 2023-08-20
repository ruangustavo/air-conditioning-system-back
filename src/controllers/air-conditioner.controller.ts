import { type Request, type Response } from 'express'
import { type AirConditionerService } from '@/services'
import { ResourceNotFound } from '@/errors'
import { idSchema } from '@/schemas'
import { ZodError } from 'zod'

export class AirConditionerController {
  constructor (private readonly airConditionerService: AirConditionerService) {}

  getAllAirConditioners = async (_req: Request, res: Response) => {
    const airConditioners = await this.airConditionerService.getAllAirConditioners()
    res.json(airConditioners)
  }

  getAirConditionerById = async (req: Request, res: Response) => {
    try {
      const { id } = idSchema.parse(req.params)
      const airConditioner = await this.airConditionerService.getAirConditionerById(id)
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
    const newAirConditioner = await this.airConditionerService.createAirConditioner(
      airConditioner
    )
    res.status(201).json(newAirConditioner)
  }

  updateAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const airConditioner = req.validatedData

    try {
      const updatedAirConditioner = await this.airConditionerService.updateAirConditioner(id, airConditioner)
      res.json(updatedAirConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }

  deleteAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const deletedAirConditioner = await this.airConditionerService.deleteAirConditioner(id)
      res.json(deletedAirConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }
}
