import { idSchema } from '@/schemas'
import { type RoomService } from '@/services'
import { type Request, type Response } from 'express'

export class RoomController {
  constructor (private readonly roomService: RoomService) {}

  getRooms = async (req: Request, res: Response) => {
    const rooms = await this.roomService.getRooms()
    return res.status(200).json({ rooms })
  }

  createRoom = async (req: Request, res: Response) => {
    const createdRoom = await this.roomService.createRoom(req.body)
    return res.status(201).json({ room: createdRoom })
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
    return res.status(201).json({ air_conditioner: airConditioner })
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
    return res.status(200).json({ air_conditioners: airConditioners })
  }
}
