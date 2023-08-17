import { mqttClient } from '@/lib'
import { type UpdateStateData, type StateRepository } from '@/repositories'

const TURN_ON_COMMAND = '1'
const TURN_OFF_COMMAND = '0'

export class StateService {
  constructor (
    private readonly stateRepository: StateRepository
  ) {}

  updateAirConditionerState = async (airConditionerId: number, { state }: UpdateStateData) => {
    const updatedAirConditioner = await this.stateRepository.updateAirConditionerState(airConditionerId, { state })

    mqttClient.publish(
      `air-conditioner/${airConditionerId}/state`,
      state ? TURN_ON_COMMAND : TURN_OFF_COMMAND
    )

    return updatedAirConditioner
  }
}
