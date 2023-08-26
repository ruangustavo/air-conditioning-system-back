import { type AirConditionerUpdateWithoutIsActive, type AirConditionerRepository } from '../repositories'
import { ResourceNotFound } from '@/errors'
import { mqttClient } from '@/lib'

const AIR_CONDITIONER_STATE_COMMANDS = {
  ON: '1',
  OFF: '0'
}

export class AirConditionerService {
  constructor (private readonly airConditionerRepository: AirConditionerRepository) {}

  getAllAirConditioners = async () => {
    const airConditioners = await this.airConditionerRepository.getAllAirConditioners()
    return airConditioners
  }

  getAirConditionerById = async (id: number) => {
    const airConditioner = await this.airConditionerRepository.getAirConditionerById(id)

    if (airConditioner == null) {
      throw new ResourceNotFound()
    }

    return airConditioner
  }

  updateAirConditioner = async (id: number, airConditioner: AirConditionerUpdateWithoutIsActive) => {
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

  updateAirConditionerState = async (id: number, state: boolean) => {
    const existingAirConditioner = await this.airConditionerRepository.getAirConditionerById(id)

    if (existingAirConditioner == null) {
      throw new ResourceNotFound()
    }

    const updatedAirConditioner = await this.airConditionerRepository.updateAirConditionerState(id, state)

    mqttClient.publish(
      `air-conditioner/${id}/state`,
      state ? AIR_CONDITIONER_STATE_COMMANDS.ON : AIR_CONDITIONER_STATE_COMMANDS.OFF
    )

    return updatedAirConditioner
  }
}
