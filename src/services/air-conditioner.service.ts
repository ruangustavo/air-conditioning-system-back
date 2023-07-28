import { AirConditioner } from "@prisma/client";
import { AirConditionerRepository } from "../repositories/air-conditioner.repository";

/**
 * This service is responsible for handling the business logic for the air-conditioners.
 * It is used by the controllers to get the data from the database.
 */

export class AirConditionerService {
  constructor(
    private airConditionerRepository: AirConditionerRepository
  ){}

  getAll = async () => {
    const airConditioners = this.airConditionerRepository.getAll();
    return airConditioners;
  };

  getOne = async (id: number) => {
    const airConditioner = await this.airConditionerRepository.getOne(id);
    return airConditioner;
  };

  create = async (airConditioner: AirConditioner) => {
    const airConditionerCreated = await this.airConditionerRepository.create(airConditioner);
    return airConditionerCreated;
  };

  update = async (id: number, airConditioner: AirConditioner) => {
    const updatedAirConditioner = await this.airConditionerRepository.update(
      id,
      airConditioner
    );
    return updatedAirConditioner;
  };

  delete = async (id: number) => {
    const deletedAirConditioner = await this.airConditionerRepository.delete(id);
    return deletedAirConditioner;
  };
}
