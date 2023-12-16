import { type AirConditioner, type Prisma } from '@prisma/client'

export interface AirConditionerRepository {
  save: (airConditioner: Prisma.AirConditionerUncheckedCreateInput) => Promise<AirConditioner>
  findAllByRoomId: (roomId: number) => Promise<AirConditioner[]>
  updateStateById: (id: number, state: boolean) => Promise<AirConditioner>
}
