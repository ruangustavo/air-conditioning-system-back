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
    const stateUpdated = await this.airConditionerRepository.updateStateById(id, state)
    return stateUpdated
  }
}
