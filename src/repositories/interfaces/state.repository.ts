import { type State } from '@/models'
import { type updateStateSchema } from '@/schemas'
import { type z } from 'zod'

export type UpdateStateData = z.infer<typeof updateStateSchema>

export interface StateRepository {
  updateAirConditionerState: (airConditionerId: number, state: UpdateStateData) => Promise<State>
}
