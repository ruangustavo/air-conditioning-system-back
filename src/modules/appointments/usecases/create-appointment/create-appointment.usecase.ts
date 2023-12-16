import { type AppointmentRepository } from '../../repositories/appointment.repository'
import { type RoomRepository } from '@/modules/room/repositories/room.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

import * as scheduler from 'node-schedule'
import { mqttClient } from '@/infra/mqtt/mqtt'
import { type AirConditionerRepository } from '@/modules/air-conditioner/repositories/air-conditioner.repository'

interface CreateAppointmentUsecaseRequest {
  hour: number
  minute: number
  roomId: number
  startDayOfWeek: number
  endDayOfWeek: number
  state: boolean
}

export class CreateAppointmentUsecase {
  constructor (
    private readonly appointmentRepository: AppointmentRepository,
    private readonly roomRepository: RoomRepository,
    private readonly airConditionerRepository: AirConditionerRepository
  ) {}

  async execute ({ hour, minute, roomId, startDayOfWeek, endDayOfWeek, state }: CreateAppointmentUsecaseRequest) {
    const existingRoom = await this.roomRepository.findById(roomId)
    if (existingRoom === null) {
      throw new ResourceNotFoundError('Room not found')
    }

    const schedulingRule = this.getSchedulingRule(startDayOfWeek, endDayOfWeek, hour, minute)

    scheduler.scheduleJob(schedulingRule, async () => {
      const airConditioners = await this.airConditionerRepository.findAllByRoomId(roomId)

      for (const airConditioner of airConditioners) {
        await this.updateAirConditionerState(airConditioner.id, state)
        await this.airConditionerRepository.updateStateById(airConditioner.id, state)
      }
    })

    const createdAppointment = await this.appointmentRepository.save({
      hour,
      minute,
      room_id: roomId,
      start_day_of_week: startDayOfWeek,
      state
    })

    return createdAppointment
  }

  async updateAirConditionerState (id: number, state: boolean) {
    const topic = `air-conditioner/${id}/state`
    const updatedState = state ? 'on' : 'off'
    mqttClient.publish(topic, updatedState)
  }

  private getSchedulingRule (startDayOfWeek: number, endDayOfWeek: number, hour: number, minute: number) {
    const rule = new scheduler.RecurrenceRule()
    rule.dayOfWeek = [startDayOfWeek, endDayOfWeek ?? startDayOfWeek]
    rule.hour = hour
    rule.minute = minute
    return rule
  }
}
