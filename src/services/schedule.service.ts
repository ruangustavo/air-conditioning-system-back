import { type CreateScheduleData, type ScheduleRepository } from '@/repositories'
import * as scheduler from 'node-schedule'
import { type StateService } from './state.service'

const DEFAULT_TIMEZONE = 'America/Sao_Paulo'

export class ScheduleService {
  constructor (
    private readonly scheduleRepository: ScheduleRepository,
    private readonly stateService: StateService
  ) {}

  create = async (airConditionerId: number, schedule: CreateScheduleData) => {
    const createdSchedule = await this.scheduleRepository.create(airConditionerId, schedule)
    const schedulingRule = this.getSchedulingRule(schedule)
    const { state } = schedule

    scheduler.scheduleJob(schedulingRule, async () => {
      await this.stateService.updateAirConditionerState(airConditionerId, { state })
      console.log(`Scheduled task executed: Turn on air conditioner ${airConditionerId}`)
    })

    return createdSchedule
  }

  private readonly getSchedulingRule = (schedule: CreateScheduleData) => {
    const rule = new scheduler.RecurrenceRule()
    rule.dayOfWeek = new scheduler.Range(schedule.start_day_of_week, schedule.end_day_of_week ?? schedule.start_day_of_week)
    rule.hour = schedule.hour
    rule.minute = schedule.minute
    rule.tz = DEFAULT_TIMEZONE
    return rule
  }
}
