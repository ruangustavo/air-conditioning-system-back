import { type AirConditioner } from '@/models'

export interface AirConditionerRepository {
  getAll: () => Promise<AirConditioner[]>
  getOne: (id: number) => Promise<AirConditioner | null>
  create: (airConditioner: AirConditioner) => Promise<AirConditioner>
  update: (id: number, airConditioner: AirConditioner) => Promise<AirConditioner>
  delete: (id: number) => Promise<AirConditioner>
}
