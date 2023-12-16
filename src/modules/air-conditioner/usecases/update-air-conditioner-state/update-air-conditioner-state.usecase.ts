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
    mqttClient.publish(`air-conditioner/${id}/state`, state ? '1' : '0')

    const stateUpdated = await this.airConditionerRepository.updateStateById(
      id, state
    )

    return stateUpdated
  }
}
