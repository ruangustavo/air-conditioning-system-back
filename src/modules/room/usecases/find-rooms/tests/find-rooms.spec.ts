import { describe, it, expect, beforeEach } from 'vitest'
import { FindRoomsUsecase } from '../find-rooms.usecase'
import { InMemoryRoomRepository } from '@/modules/room/repositories/in-memory/in-memory-room.repository'

let roomRepository: InMemoryRoomRepository
let sut: FindRoomsUsecase

describe('FindRoomsUsecase', () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository()
    sut = new FindRoomsUsecase(roomRepository)
  })

  it('should return a empty list of rooms', async () => {
    const rooms = await sut.execute()
    expect(rooms.length).toBe(0)
  })

  it('should return a list of rooms if there are rooms', async () => {
    await roomRepository.save({
      name: 'any_name',
      description: 'any_description'
    })

    const rooms = await sut.execute()
    expect(rooms.length).toBe(1)
  })
})
