import { prisma } from ".";
import { AirConditioner as AirConditionerEntity } from "@prisma/client";

/**
 * This class is responsible for handling the database operations for the air-conditioners.
 * It is used by the services to get the data from the database.
 */

export class AirConditioner {
  static getAll = async () => {
    const airConditioners = await prisma.airConditioner.findMany();
    return airConditioners;
  };

  static getOne = (id: number) => {
    const airConditioner = prisma.airConditioner.findUnique({
      where: { id },
    });
    return airConditioner;
  };

  static create = async (airConditioner: AirConditionerEntity) => {
    const createdAirConditioner = await prisma.airConditioner.create({
      data: airConditioner,
    });
    return createdAirConditioner;
  };

  static update = async (id: number, airConditioner: AirConditionerEntity) => {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: { id },
      data: airConditioner,
    });
    return updatedAirConditioner;
  };

  static delete = async (id: number) => {
    const deletedAirConditioner = await prisma.airConditioner.delete({
      where: { id },
    });
    return deletedAirConditioner;
  };
}
