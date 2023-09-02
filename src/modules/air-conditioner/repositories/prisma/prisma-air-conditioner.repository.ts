import { AirConditioner, Prisma } from "@prisma/client";
import { AirConditionerRepository } from "../air-conditioner.repository";
import { prisma } from "@/infra/database/prisma";

export class PrismaAirConditionerRepository implements AirConditionerRepository{

  save = async (airConditioner: Prisma.AirConditionerUncheckedCreateInput) => {
    const createdAirConditioner = await prisma.airConditioner.create({
      data: airConditioner
    })
    return createdAirConditioner
  }

  findAllByRoomId = async (roomId: number): Promise<AirConditioner[]> => {
    const airConditioners = await prisma.airConditioner.findMany({
      where: {
        room_id: roomId
      }
    })
    return airConditioners
  }

  updateStateById = async (id: number, state: boolean): Promise<AirConditioner> => {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: {
        id
      },
      data: {
        is_active: state
      }
    })
    return updatedAirConditioner
  }

}
