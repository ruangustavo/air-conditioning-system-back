import { prisma } from "../db";
import { AirConditioner } from "@prisma/client";

type AirConditionerInput = {
  brand: string;
  model: string;
  toggled: boolean;
};

class AirConditionerService {
  /**
   * Get all air conditioners of a room
   * @param roomId Id of the room
   * @returns All air conditioners of a room
   */
  async getAllAirConditioners(roomId: number): Promise<AirConditioner[]> {
    return await prisma.airConditioner.findMany({
      where: {
        roomId: roomId,
      },
    });
  }

  /**
   * Get air conditioner by id
   * @param id Id of the air conditioner
   * @returns Air conditioner with the given id
   */
  async getAirConditionerById(id: number): Promise<AirConditioner | null> {
    return await prisma.airConditioner.findUnique({
      where: { id: id },
    });
  }

  /**
   * Add air conditioner to a room
   * @param roomId Id of the room
   * @param airConditioner Air conditioner to be added
   * @returns Added air conditioner
   */
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

  /**
   * Get all air conditioners of a room
   * @param roomId Id of the room
   * @returns All air conditioners of a room
   */
  async getAirConditionerByRoomId(roomId: number): Promise<AirConditioner[]> {
    return await prisma.airConditioner.findMany({
      where: {
        roomId: roomId,
      },
    });
  }

  /**
   * Update air conditioner
   * @param id Id of the air conditioner
   * @param data Data to be updated
   */
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

  /**
   * Delete air conditioner
   * @param id Id of the air conditioner
   */
  async deleteAirConditioner(id: number): Promise<void> {
    await prisma.airConditioner.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * Get air conditioner state
   * @param id Id of the air conditioner
   * @returns  Air conditioner state
   */
  async getAirConditionerState(id: number): Promise<boolean> {
    const airConditioner = await prisma.airConditioner.findUnique({
      where: {
        id: id,
      },
    });
    const toggled = airConditioner?.toggled;
    return toggled ?? false;
  }

  /**
   * Update air conditioner state
   * @param id Id of the air conditioner
   * @param toggled State of the air conditioner
   * @returns Updated air conditioner
   */
  async updateAirConditionerState(
    id: number,
    toggled: boolean
  ): Promise<AirConditioner> {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: {
        id: id,
      },
      data: {
        toggled: toggled,
      },
    });

    return updatedAirConditioner;
  }
}

export const airConditionerService = new AirConditionerService();
