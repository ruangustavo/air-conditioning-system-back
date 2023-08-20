import { type CreateAppointmentData, type AppointmentRepository } from '@/repositories'
import * as scheduler from 'node-schedule'
import { type StateService } from './state.service'

const DEFAULT_TIMEZONE = 'America/Sao_Paulo'

export class AppointmentService {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly stateService: StateService
  ) {}

  create = async (airConditionerId: number, appointment: CreateAppointmentData) => {
    const createdAppointment = await this.appointmentRepository.create(airConditionerId, appointment)
    const schedulingRule = this.getSchedulingRule(appointment)
    const { state } = appointment

    scheduler.scheduleJob(schedulingRule, async () => {
      await this.stateService.updateAirConditionerState(airConditionerId, { state })
      console.log(`Scheduled task executed: Turn on air conditioner ${airConditionerId}`)
    })

    return createdAppointment
  }

  private readonly getSchedulingRule = (appointment: CreateAppointmentData) => {
    const rule = new scheduler.RecurrenceRule()
    rule.dayOfWeek = new scheduler.Range(appointment.start_day_of_week, appointment.end_day_of_week ?? appointment.start_day_of_week)
    rule.hour = appointment.hour
    rule.minute = appointment.minute
    rule.tz = DEFAULT_TIMEZONE
    return rule
  }
}
