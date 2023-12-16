import { type Request, type Response } from 'express'
import { type RoomRepository } from '../../repositories/room.repository'
import { ZodError, z } from 'zod'

export const createRoomSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty().optional()
})

export class CreateRoomController {
  constructor (
    private readonly roomRepository: RoomRepository
  ) {}

  async handle (req: Request, res: Response) {
    try {
      const { name, description } = createRoomSchema.parse(req.body)
      const room = await this.roomRepository.save({ name, description })
      return res.status(201).json({ room })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}
