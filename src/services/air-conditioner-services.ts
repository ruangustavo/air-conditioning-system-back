import { prisma } from "../db";
import { AirConditioner } from "@prisma/client";
import {
  AirConditionerProps,
  AirConditionerStateProps,
  IAirConditionerService,
} from "./interfaces/i-air-conditioner-service";

class AirConditionerService implements IAirConditionerService {
  async getAllAirConditionersByRoomId(
    roomId: number
  ): Promise<AirConditioner[]> {
    return prisma.airConditioner.findMany({ where: { roomId } });
  }

  async getAirConditionerById(id: number): Promise<AirConditioner | null> {
    return prisma.airConditioner.findUnique({ where: { id } });
  }

  async addAirConditioner(
    roomId: number,
    airConditioner: AirConditionerProps
  ): Promise<AirConditioner> {
    return prisma.airConditioner.create({
      data: { roomId, ...airConditioner },
    });
  }

  async getAirConditionerByRoomId(roomId: number): Promise<AirConditioner[]> {
    return prisma.airConditioner.findMany({ where: { roomId } });
  }

  async updateAirConditioner(
    id: number,
    data: AirConditionerProps
  ): Promise<void> {
    await prisma.airConditioner.update({ where: { id }, data });
  }

  async deleteAirConditioner(id: number): Promise<void> {
    await prisma.airConditioner.delete({ where: { id } });
  }

  async getAirConditionerState(id: number): Promise<boolean> {
    const airConditioner = await prisma.airConditioner.findUnique({
      where: { id },
    });
    return airConditioner?.toggled ?? false;
  }

  async updateAirConditionerState({
    id,
    toggled,
  }: AirConditionerStateProps): Promise<AirConditioner> {
    return prisma.airConditioner.update({ where: { id }, data: { toggled } });
  }
}

export const airConditionerService = new AirConditionerService();
