import { type Request, type Response } from 'express'
import { ZodError, z } from 'zod'
import { CreateAirConditionerUsecase } from './create-air-conditioner.usecase'
import { type AirConditionerRepository } from '../../repositories/air-conditioner.repository'
import { type RoomRepository } from '@/modules/room/repositories/room.repository'

const createAirConditionerPathParamsSchema = z.object({
  roomId: z.coerce.number()
})

const createAirConditionerSchema = z.object({
  brand: z.string().nonempty(),
  model: z.string().nonempty(),
  protocol: z.string().nonempty()
})

export class CreateAirConditionerController {
  constructor (
    private readonly airConditionerRepository: AirConditionerRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  async handle (req: Request, res: Response) {
    const createAirConditionerUsecase = new CreateAirConditionerUsecase(this.airConditionerRepository, this.roomRepository)

    try {
      const { roomId } = createAirConditionerPathParamsSchema.parse(req.params)
      const { brand, model, protocol } = createAirConditionerSchema.parse(req.body)
      const createdAirConditioner = await createAirConditionerUsecase.execute({ roomId, brand, model, protocol })
      return res.status(201).json({ air_conditioner: createdAirConditioner })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.issues })
      }
    }
  }
}
