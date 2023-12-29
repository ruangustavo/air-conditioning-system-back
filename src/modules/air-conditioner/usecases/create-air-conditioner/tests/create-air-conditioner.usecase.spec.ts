import { describe, it, expect, beforeEach } from 'vitest'
import { CreateAirConditionerUsecase } from '../create-air-conditioner.usecase'
import { InMemoryAirConditionerRepository } from '@/modules/air-conditioner/repositories/in-memory/in-memory-air-conditioner.repository'
import { InMemoryRoomRepository } from '@/modules/room/repositories/in-memory/in-memory-room.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

let airConditionerRepository: InMemoryAirConditionerRepository
let roomRepository: InMemoryRoomRepository
let sut: CreateAirConditionerUsecase

describe('CreateAirConditionerUsecase', () => {
  beforeEach(() => {
    airConditionerRepository = new InMemoryAirConditionerRepository()
    roomRepository = new InMemoryRoomRepository()
    sut = new CreateAirConditionerUsecase(airConditionerRepository, roomRepository)
  })

  it('should create a new air-conditioner with valid data', async () => {
    const room = await roomRepository.save({ name: 'any_room_name' })
    const expectedAirConditioner = {
      id: 1,
      room_id: room.id,
      brand: 'any_brand',
      model: 'any_model',
      protocol: 'any_protocol',
      is_active: false,
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    }

    const createdAirConditioner = await sut.execute(
      {
        roomId: room.id, brand: 'any_brand', model: 'any_model', protocol: 'any_protocol'
      }
    )

    expect(createdAirConditioner).toEqual(expectedAirConditioner)
    expect(airConditionerRepository.airConditioners).toHaveLength(1)
  })

  it('should throw ResourceNotFoundError if room does not exist', async () => {
    const promise = sut.execute(
      {
        roomId: 6, brand: 'any_brand', model: 'any_model', protocol: 'any_protocol'
      }
    )

    await expect(promise).rejects.toThrowError(ResourceNotFoundError)
  })
})
