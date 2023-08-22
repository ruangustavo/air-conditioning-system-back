import { type Request, type Response } from 'express'
import { type AirConditionerService } from '@/services'
import { ResourceNotFound } from '@/errors'
import { idSchema } from '@/schemas'

export class AirConditionerController {
  constructor (private readonly airConditionerService: AirConditionerService) {}

  getAllAirConditioners = async (_req: Request, res: Response) => {
    const airConditioners = await this.airConditionerService.getAllAirConditioners()
    res.json(airConditioners)
  }

  getAirConditionerById = async (req: Request, res: Response) => {
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
      const airConditioner = await this.airConditionerService.getAirConditionerById(id)
      res.json(airConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }

  updateAirConditioner = async (req: Request, res: Response) => {
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
      const updatedAirConditioner = await this.airConditionerService.updateAirConditioner(id, airConditioner)
      res.json(updatedAirConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }

  deleteAirConditioner = async (req: Request, res: Response) => {
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
      const deletedAirConditioner = await this.airConditionerService.deleteAirConditioner(id)
      res.json(deletedAirConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }

  updateAirConditionerState = async (req: Request, res: Response) => {
    const parsedParams = idSchema.safeParse(req.params)

    if (!parsedParams.success) {
      return res.status(400).json(
        {
          message: 'Validation error', error: parsedParams.error.format()
        }
      )
    }

    const { id } = parsedParams.data
    const { state } = req.validatedData

    try {
      const updatedAirConditioner = await this.airConditionerService.updateAirConditionerState(id, state)
      res.json(updatedAirConditioner)
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        res.status(404).json({ error: error.message })
      }
    }
  }
}
