import { type RoomRepository, type AppointmentRepository, type AirConditionerRepository } from '@/repositories'
import * as scheduler from 'node-schedule'
import { type Prisma } from '@prisma/client'

const DEFAULT_TIMEZONE = 'America/Sao_Paulo'

export class AppointmentService {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly airConditionerRepository: AirConditionerRepository,
    private readonly roomRepository: RoomRepository
  ) {}

  createAppointment = async (roomId: number, appointment: Prisma.AppointmentCreateInput) => {
    const createdAppointment = await this.appointmentRepository.createAppointment(roomId, appointment)
    const schedulingRule = this.getSchedulingRule(appointment)

    scheduler.scheduleJob(schedulingRule, async () => {
      const airConditioners = await this.roomRepository.getAirConditionersFromRoom(roomId)

      for (const airConditioner of airConditioners) {
        await this.airConditionerRepository.updateAirConditionerState(airConditioner.id, appointment.state)
        console.log(`Air conditioner ${airConditioner.id} updated to ${appointment.state ? 'on' : 'off'}`)
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
