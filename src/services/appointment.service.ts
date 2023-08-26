import { type RoomRepository, type AppointmentRepository, type AirConditionerRepository } from '@/repositories'
import * as scheduler from 'node-schedule'
import { type Prisma } from '@prisma/client'
import { ResourceNotFound } from '@/errors'
import { mqttClient } from '@/lib'

const DEFAULT_TIMEZONE = 'America/Sao_Paulo'

const AIR_CONDITIONER_STATE_COMMANDS = {
  ON: '1',
  OFF: '0'
}

export class AppointmentService {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly airConditionerRepository: AirConditionerRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  createAppointment = async (roomId: number, appointment: Prisma.AppointmentCreateInput) => {
    const existingRoom = await this.roomRepository.getRoomById(roomId)

    if (existingRoom === null) {
      throw new ResourceNotFound()
    }

    const createdAppointment = await this.appointmentRepository.createAppointment(roomId, appointment)
    const schedulingRule = this.getSchedulingRule(appointment)

    scheduler.scheduleJob(schedulingRule, async () => {
      const airConditioners = await this.roomRepository.getAirConditionersFromRoom(roomId)

      for (const airConditioner of airConditioners) {
        await this.airConditionerRepository.updateAirConditionerState(airConditioner.id, appointment.state)

        mqttClient.publish(
          `air-conditioner/${airConditioner.id}/state`,
          appointment.state ? AIR_CONDITIONER_STATE_COMMANDS.ON : AIR_CONDITIONER_STATE_COMMANDS.OFF
        )
      }
    })

    return createdAppointment
  }

  private readonly getSchedulingRule = (appointment: Prisma.AppointmentCreateInput) => {
    const rule = new scheduler.RecurrenceRule()
    rule.dayOfWeek = new scheduler.Range(appointment.start_day_of_week, appointment.end_day_of_week ?? appointment.start_day_of_week)
    rule.hour = appointment.hour
    rule.minute = appointment.minute
    rule.tz = DEFAULT_TIMEZONE
    return rule
  }
}
