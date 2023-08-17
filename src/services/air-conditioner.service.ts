import { type AirConditioner } from '@/models'
import { type AirConditionerRepository } from '../repositories'
import { ResourceNotFound } from '@/errors'

export class AirConditionerService {
  constructor (private readonly airConditionerRepository: AirConditionerRepository) {}

  getAll = async () => {
    const airConditioners = this.airConditionerRepository.getAll()
    return await airConditioners
  }

  getOne = async (id: number) => {
    const airConditioner = await this.airConditionerRepository.getOne(id)

    if (airConditioner == null) {
      throw new ResourceNotFound()
    }

    return airConditioner
  }

  create = async (airConditioner: AirConditioner) => {
    const airConditionerCreated = await this.airConditionerRepository.create(airConditioner)
    return airConditionerCreated
  }

  update = async (id: number, airConditioner: AirConditioner) => {
    const existingAirConditioner = await this.airConditionerRepository.getOne(id)

    if (existingAirConditioner == null) {
      throw new ResourceNotFound()
    }

    const updatedAirConditioner = await this.airConditionerRepository.update(id, airConditioner)
    return updatedAirConditioner
  }

  delete = async (id: number) => {
    const existingAirConditioner = await this.airConditionerRepository.getOne(id)

    if (existingAirConditioner == null) {
      throw new ResourceNotFound()
    }

    const deletedAirConditioner = await this.airConditionerRepository.delete(id)
    return deletedAirConditioner
  }
}
