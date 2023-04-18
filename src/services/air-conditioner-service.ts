import { AirConditioner as AirConditionerEntity } from "@prisma/client";
import { AirConditioner } from "../database/air-conditioner";

/**
 * This service is responsible for handling the business logic for the air-conditioners.
 * It is used by the controllers to get the data from the database.
 */

export class AirConditionerService {
  static getAll = async () => {
    const airConditioners = AirConditioner.getAll();
    return airConditioners;
  };

  static getOne = async (id: number) => {
    const airConditioner = await AirConditioner.getOne(id);
    return airConditioner;
  };

  static create = async (airConditioner: AirConditionerEntity) => {
    const airConditionerCreated = await AirConditioner.create(airConditioner);
    return airConditionerCreated;
  };

  static update = async (id: number, airConditioner: AirConditionerEntity) => {
    const updatedAirConditioner = await AirConditioner.update(
      id,
      airConditioner
    );
    return updatedAirConditioner;
  };

  static delete = async (id: number) => {
    const deletedAirConditioner = await AirConditioner.delete(id);
    return deletedAirConditioner;
  };
}
