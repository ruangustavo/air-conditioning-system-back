import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('FindRoomController', () => {
  it('should return an empty list of rooms', async () => {
    const response = await request(app).get('/rooms')
    expect(response.status).toBe(200)
    expect(response.body.rooms).toEqual([])
  })
})
