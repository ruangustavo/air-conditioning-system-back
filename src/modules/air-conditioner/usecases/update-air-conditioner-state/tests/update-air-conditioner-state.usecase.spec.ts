import { describe, it, expect, beforeEach } from 'vitest'
import { UpdateAirConditionerStateUsecase } from '../update-air-conditioner-state.usecase'
import { InMemoryAirConditionerRepository } from '@/modules/air-conditioner/repositories/in-memory/in-memory-air-conditioner.repository'
import { InMemoryRoomRepository } from '@/modules/room/repositories/in-memory/in-memory-room.repository'

let roomRepository: InMemoryRoomRepository
let airConditionerRepository: InMemoryAirConditionerRepository
let sut: UpdateAirConditionerStateUsecase

describe('UpdateAirConditionerStateUsecase', () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository()
    airConditionerRepository = new InMemoryAirConditionerRepository()
    sut = new UpdateAirConditionerStateUsecase(airConditionerRepository)
  })

  it('should update air-cnoditioner with valid data successfully', async () => {
    const room = await roomRepository.save({ name: 'any_name' })

    const airConditioner = await airConditionerRepository.save({
      model: 'any_model',
      brand: 'any_brand',
      protocol: 'any_protocol',
      room_id: room.id
    })

    const airConditionerUpdated = await sut.execute({ id: airConditioner.id, state: true })

    expect(airConditionerUpdated).toEqual({
      id: airConditioner.id,
      model: 'any_model',
      brand: 'any_brand',
      protocol: 'any_protocol',
      room_id: room.id,
      is_active: true,
      updated_at: expect.any(Date),
      created_at: expect.any(Date)
    })
  })
})
