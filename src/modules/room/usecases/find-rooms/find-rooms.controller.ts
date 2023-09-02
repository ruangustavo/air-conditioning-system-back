import { type Request, type Response } from 'express'
import { type RoomRepository } from '../../repositories/room.repository'

export class FindRoomsController {
  constructor (
    private readonly roomRepository: RoomRepository
  ) {}

  async handle (req: Request, res: Response) {
    const rooms = await this.roomRepository.findAll()
    return res.json({ rooms })
  }
}
