import { type CreateScheduleData, type ScheduleRepository } from '@/repositories'
import * as scheduler from 'node-schedule'
import { type StateService } from './state.service'

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
    const schedulingRule = new scheduler.RecurrenceRule()
    schedulingRule.dayOfWeek = new scheduler.Range(schedule.start_day_of_week, schedule.end_day_of_week ?? schedule.start_day_of_week)
    schedulingRule.hour = schedule.hour
    schedulingRule.minute = schedule.minute
    return schedulingRule
  }
}
