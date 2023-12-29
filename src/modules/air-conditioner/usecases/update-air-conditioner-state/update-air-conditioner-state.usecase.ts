import { mqttClient } from '@/infra/mqtt/mqtt'
import { type AirConditionerRepository } from '../../repositories/air-conditioner.repository'

interface UpdateAirConditionerStateUsecaseRequest {
  id: number
  state: boolean
}

export class UpdateAirConditionerStateUsecase {
  constructor (
    private readonly airConditionerRepository: AirConditionerRepository
  ) {}

  async execute ({ id, state }: UpdateAirConditionerStateUsecaseRequest) {
    const message = {
      action: 'change-state',
      state: state ? 'on' : 'off'
    }

    mqttClient.publish(`air-conditioners/${id}`, JSON.stringify(message))

    const stateUpdated = await this.airConditionerRepository.updateStateById(
      id, state
    )

    return stateUpdated
  }
}
