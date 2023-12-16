import { type Request, type Response } from 'express'
import { type AppointmentRepository } from '../../repositories/appointment.repository'
import { type RoomRepository } from '@/modules/room/repositories/room.repository'
import { type AirConditionerRepository } from '@/modules/air-conditioner/repositories/air-conditioner.repository'
import { ZodError, z } from 'zod'
import { CreateAppointmentUsecase } from './create-appointment.usecase'

const createAppointmentPathParamsSchema = z.object({
  roomId: z.coerce.number()
})

const createAppointmentSchema = z.object({
  start_day_of_week: z.number().min(0).max(6),
  end_day_of_week: z.number().min(0).max(6).optional(),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  state: z.boolean()
})
  .transform(data => ({
    ...data,
    end_day_of_week: data.end_day_of_week ?? data.start_day_of_week
  }))

export class CreateAppointmentController {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly roomRepository: RoomRepository,
    private readonly airConditionerRepository: AirConditionerRepository
  ) {}

  async handle (req: Request, res: Response) {
    const createAppointmentUsecase = new CreateAppointmentUsecase(
      this.appointmentRepository, this.roomRepository, this.airConditionerRepository
    )

    try {
      const { roomId } = createAppointmentPathParamsSchema.parse(req.params)
      const { start_day_of_week: startDayOfWeek, end_day_of_week: endDayOfWeek, hour, minute, state } = createAppointmentSchema.parse(req.body)
      const appointment = await createAppointmentUsecase.execute({
        startDayOfWeek,
        endDayOfWeek,
        hour,
        minute,
        roomId,
        state
      })
      return res.status(201).json({ appointment })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.issues })
      }
    }
  }
}
