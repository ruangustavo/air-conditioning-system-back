import { type AirConditioner } from '@/models'
import { prisma } from '@/lib'
import { type AirConditionerRepository } from './air-conditioner.repository'

export class PrismaAirConditionerRepository implements AirConditionerRepository {
  getAll = async () => {
    const airConditioners = await prisma.airConditioner.findMany()
    return airConditioners
  }

  getOne = async (id: number) => {
    const airConditioner = prisma.airConditioner.findUnique({
      where: { id }
    })
    return await airConditioner
  }

  create = async (airConditioner: AirConditioner) => {
    const createdAirConditioner = await prisma.airConditioner.create({
      data: { ...airConditioner }
    })
    return createdAirConditioner
  }

  update = async (id: number, airConditioner: AirConditioner) => {
    const updatedAirConditioner = await prisma.airConditioner.update({
      where: { id },
      data: airConditioner
    })
    return updatedAirConditioner
  }

  delete = async (id: number) => {
    const deletedAirConditioner = await prisma.airConditioner.delete({
      where: { id }
    })
    return deletedAirConditioner
  }
}
