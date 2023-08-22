import { type Prisma, type AirConditioner } from '@prisma/client'

export type AirConditionerUpdateWithoutIsActive = Omit<Prisma.AirConditionerUpdateInput, 'is_active'>

export interface AirConditionerRepository {
  getAllAirConditioners: () => Promise<AirConditioner[]>
  getAirConditionerById: (id: number) => Promise<AirConditioner | null>
  updateAirConditioner: (id: number, airConditioner: AirConditionerUpdateWithoutIsActive) => Promise<AirConditioner>
  deleteAirConditioner: (id: number) => Promise<boolean>
  updateAirConditionerState: (id: number, state: boolean) => Promise<AirConditioner>
}
