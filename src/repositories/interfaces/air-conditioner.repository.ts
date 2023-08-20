import { type Prisma, type AirConditioner } from '@prisma/client'

export interface AirConditionerRepository {
  getAllAirConditioners: () => Promise<AirConditioner[]>
  getAirConditionerById: (id: number) => Promise<AirConditioner | null>
  createAirConditioner: (airConditioner: Prisma.AirConditionerCreateInput) => Promise<AirConditioner>
  updateAirConditioner: (id: number, airConditioner: Prisma.AirConditionerUpdateInput) => Promise<AirConditioner>
  deleteAirConditioner: (id: number) => Promise<boolean>
}
