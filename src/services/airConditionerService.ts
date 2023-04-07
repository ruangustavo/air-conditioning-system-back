import { prisma } from "../db";
import { AirConditioner } from "@prisma/client";

type AirConditionerInput = {
  brand: string;
  model: string;
  toggled: boolean;
};

class AirConditionerServices {
  async getAirConditionerById(id: number): Promise<AirConditioner | null> {
    return await prisma.airConditioner.findUnique({
      where: { id: id },
    });
  }

  async addAirConditioner(
    roomId: number,
    airConditioner: AirConditionerInput
  ): Promise<AirConditioner> {
    return await prisma.airConditioner.create({
      data: {
        roomId: roomId,
        ...airConditioner,
      },
    });
  }

  async getAirConditionerByRoomId(roomId: number): Promise<AirConditioner[]> {
    return await prisma.airConditioner.findMany({
      where: {
        roomId: roomId,
      },
    });
  }

  async updateAirConditioner(
    id: number,
    data: AirConditionerInput
  ): Promise<void> {
    await prisma.airConditioner.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteAirConditioner(id: number): Promise<void> {
    await prisma.airConditioner.delete({
      where: {
        id: id,
      },
    });
  }

  async getAirConditionerState(id: number): Promise<boolean> {
    const airConditioner = await prisma.airConditioner.findUnique({
      where: {
        id: id,
      },
    });
    const toggled = airConditioner?.toggled;
    return toggled ?? false;
  }

  async updateAirConditionerState(id: number, toggled: boolean): Promise<void> {
    await prisma.airConditioner.update({
      where: {
        id: id,
      },
      data: {
        toggled: toggled,
      },
    });
  }
}

export const airConditionerService = new AirConditionerServices();
