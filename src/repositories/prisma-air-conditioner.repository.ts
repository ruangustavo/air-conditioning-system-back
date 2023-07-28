import { AirConditioner as AirConditionerEntity } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AirConditionerRepository } from "./air-conditioner.repository";

/**
 * This class is responsible for handling the database operations for the air-conditioners.
 * It is used by the services to get the data from the database.
 */

export class PrismaAirConditionerRepository implements AirConditionerRepository {
  getAll = async () => {
    const airConditioners = await prisma.airConditioner.findMany();
    return airConditioners;
  };

  getOne = async (id: number) => {
    const airConditioner = prisma.airConditioner.findUnique({
      where: { id },
    });
    return airConditioner;
  };

  create = async (airConditioner: AirConditionerEntity) => {
    const createdAirConditioner = await prisma.airConditioner.create({
      data: { ...airConditioner },
    });
    return createdAirConditioner;
  };

  update = async (id: number, airConditioner: AirConditionerEntity) => {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: { id },
      data: airConditioner,
    });
    return updatedAirConditioner;
  };

  delete = async (id: number) => {
    const deletedAirConditioner = await prisma.airConditioner.delete({
      where: { id },
    });
    return deletedAirConditioner;
  };
}
