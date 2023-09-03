import { InMemoryRoomRepository } from '@/modules/room/repositories/in-memory/in-memory-room.repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateRoomUsecase } from '../create-room.usecase'

let roomRepository: InMemoryRoomRepository
let sut: CreateRoomUsecase

describe('CreateRoomUsecase', () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository()
    sut = new CreateRoomUsecase(roomRepository)
  })

  it('should create a room with valid data', async () => {
    const room = await sut.execute({
      name: 'any_name',
      description: 'any_description'
    })

    expect(room).toEqual({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      updated_at: expect.any(Date),
      created_at: expect.any(Date)
    })
  })
})
