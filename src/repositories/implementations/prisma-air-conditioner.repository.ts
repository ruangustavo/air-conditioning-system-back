import { prisma } from '@/lib'
import { type AirConditionerRepository } from '../interfaces/air-conditioner.repository'
import { type Prisma } from '@prisma/client'

export class PrismaAirConditionerRepository implements AirConditionerRepository {
  getAllAirConditioners = async () => {
    const airConditioners = await prisma.airConditioner.findMany()
    return airConditioners
  }

  getAirConditionerById = async (id: number) => {
    const airConditioner = await prisma.airConditioner.findUnique({
      where: { id }
    })
    return airConditioner
  }

  updateAirConditioner = async (id: number, airConditioner: Prisma.AirConditionerUpdateInput) => {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: { id },
      data: airConditioner
    })
    return updatedAirConditioner
  }

  deleteAirConditioner = async (id: number) => {
    const deletedAirConditioner = await prisma.airConditioner.delete({
      where: { id }
    })
    return deletedAirConditioner !== null
  }

  updateAirConditionerState = async (id: number, state: boolean) => {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: { id },
      data: { is_active: state }
    })
    return updatedAirConditioner
  }
}
