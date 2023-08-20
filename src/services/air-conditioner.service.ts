import { type AirConditioner } from '@prisma/client'
import { type AirConditionerRepository } from '../repositories'
import { ResourceNotFound } from '@/errors'

export class AirConditionerService {
  constructor (private readonly airConditionerRepository: AirConditionerRepository) {}

  getAllAirConditioners = async () => {
    const airConditioners = this.airConditionerRepository.getAllAirConditioners()
    return await airConditioners
  }

  getAirConditionerById = async (id: number) => {
    const airConditioner = await this.airConditionerRepository.getAirConditionerById(id)

    if (airConditioner == null) {
      throw new ResourceNotFound()
    }

    return airConditioner
  }

  createAirConditioner = async (airConditioner: AirConditioner) => {
    const airConditionerCreated = await this.airConditionerRepository.createAirConditioner(airConditioner)
    return airConditionerCreated
  }

  updateAirConditioner = async (id: number, airConditioner: AirConditioner) => {
    const existingAirConditioner = await this.airConditionerRepository.getAirConditionerById(id)

    if (existingAirConditioner == null) {
      throw new ResourceNotFound()
    }

    const updatedAirConditioner = await this.airConditionerRepository.updateAirConditioner(id, airConditioner)
    return updatedAirConditioner
  }

  deleteAirConditioner = async (id: number) => {
    const existingAirConditioner = await this.airConditionerRepository.getAirConditionerById(id)

    if (existingAirConditioner == null) {
      throw new ResourceNotFound()
    }

    const deletedAirConditioner = await this.airConditionerRepository.deleteAirConditioner(id)
    return deletedAirConditioner
  }
}
