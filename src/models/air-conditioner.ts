import { prisma } from "../db";
import { AirConditioner as AirConditionerModel } from "@prisma/client";

export class AirConditioner {
  static async getAll(): Promise<AirConditionerModel[]> {
    const airConditioners = await prisma.airConditioner.findMany();
    return airConditioners;
  }

  static async getOne(id: number): Promise<AirConditionerModel | null> {
    const airConditioner = await prisma.airConditioner.findUnique({
      where: { id },
    });

    return airConditioner;
  }

  static async create(
    airConditioner: AirConditionerModel
  ): Promise<AirConditionerModel> {
    const newAirConditioner = await prisma.airConditioner.create({
      data: airConditioner,
    });
    return newAirConditioner;
  }

  static async update(
    id: number,
    airConditioner: AirConditionerModel
  ): Promise<AirConditionerModel> {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: { id },
      data: airConditioner,
    });
    return updatedAirConditioner;
  }

  static async delete(id: number): Promise<AirConditionerModel> {
    const deletedAirConditioner = await prisma.airConditioner.delete({
      where: { id },
    });
    return deletedAirConditioner;
  }
}
