import { ResourceNotFound } from '@/errors'
import { mqttClient } from '@/lib'
import { type AirConditionerRepository } from '@/repositories'

const TURN_ON_COMMAND = '1'
const TURN_OFF_COMMAND = '0'

export class AirConditionerStateService {
  constructor (
    private readonly airConditionerRepository: AirConditionerRepository
  ) {}

  updateState = async (id: number, state: boolean) => {
    const existingAirConditioner = await this.airConditionerRepository.getOne(id)

    if (existingAirConditioner == null) {
      throw new ResourceNotFound()
    }

    mqttClient.publish(
      `air-conditioner/${id}/state`,
      state ? TURN_ON_COMMAND : TURN_OFF_COMMAND
    )
  }
}
