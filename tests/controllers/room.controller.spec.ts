import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('[e2e] RoomController', () => {
  const roomData = {
    name: 'Room'
  }

  it('should successfully create a new room', async () => {
    const response = await request(app)
      .post('/rooms')
      .send(roomData)

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      ...roomData,
      id: expect.any(Number),
      updated_at: expect.any(String),
      created_at: expect.any(String)
    })
  })
})
