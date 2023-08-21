import { type AirConditionerRepository, type AppointmentRepository } from '@/repositories'
import * as scheduler from 'node-schedule'
import { type Prisma } from '@prisma/client'

const DEFAULT_TIMEZONE = 'America/Sao_Paulo'

export class AppointmentService {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly airConditionerRepository: AirConditionerRepository
  ) {}

  createAppointment = async (airConditionerId: number, appointment: Prisma.AppointmentCreateInput) => {
    const createdAppointment = await this.appointmentRepository.createAppointment(airConditionerId, appointment)
    const schedulingRule = this.getSchedulingRule(appointment)
    const { state } = appointment

    scheduler.scheduleJob(schedulingRule, async () => {
      await this.airConditionerRepository.updateAirConditionerState(airConditionerId, state)
      console.log(`Scheduled task executed: Turn on air conditioner ${airConditionerId}`)
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
