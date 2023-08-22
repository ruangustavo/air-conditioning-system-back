import { idSchema } from '@/schemas'
import { type RoomService } from '@/services'
import { type Request, type Response } from 'express'

export class RoomController {
  constructor (private readonly roomService: RoomService) {}

  createRoom = async (req: Request, res: Response) => {
    const createdRoom = await this.roomService.createRoom(req.body)
    return res.status(201).json(createdRoom)
  }

  addAirConditionerToRoom = async (req: Request, res: Response) => {
    const parsedParams = idSchema.safeParse(req.params)

    if (!parsedParams.success) {
      return res.status(400).json(
        {
          message: 'Validation error',
          error: parsedParams.error.format()
        }
      )
    }

    const { id: roomId } = parsedParams.data
    const airConditioner = await this.roomService.addAirConditionerToRoom(roomId, req.validatedData)
    return res.status(201).json(airConditioner)
  }

  getAirConditionersFromRoom = async (req: Request, res: Response) => {
    const parsedParams = idSchema.safeParse(req.params)

    if (!parsedParams.success) {
      return res.status(400).json(
        {
          message: 'Validation error',
          error: parsedParams.error.format()
        }
      )
    }

    const { id: roomId } = parsedParams.data
    const airConditioners = await this.roomService.getAirConditionersFromRoom(roomId)
    return res.status(200).json(airConditioners)
  }
}
