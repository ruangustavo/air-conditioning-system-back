import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib'

describe('[e2e] AirConditionerStateController', () => {
  it('should successfully update air conditioner state to "on"', async () => {
    const airConditioner = await prisma.airConditioner.create({
      data: {
        model: 'Air-conditioner',
        brand: 'Brand'
      }
    })

    const response = await request(app)
      .put(`/air-conditioners/${airConditioner.id}/state`)
      .send({ state: true })
      .expect(200)

    expect(response.body).toEqual({ success: true })
  })

  it('should handle updating state of a non-existent air conditioner', async () => {
    const nonExistentId = 9999

    const response = await request(app)
      .put(`/air-conditioners/${nonExistentId}/state`)
      .send({ state: true })
      .expect(404)

    expect(response.body).toEqual({ error: 'Resource not found' })
  })

  it('should handle updating air conditioner state with an invalid state value', async () => {
    const airConditioner = await prisma.airConditioner.create({
      data: {
        model: 'Air-conditioner',
        brand: 'Brand'
      }
    })

    const response = await request(app)
      .put(`/air-conditioners/${airConditioner.id}/state`)
      .send({ state: 'invalid' })

    expect(response.statusCode).toBe(400)
  })

  it('should handle updating air conditioner state with an invalid ID', async () => {
    const response = await request(app)
      .put('/air-conditioners/invalid-id/state')
      .send({ state: true })

    expect(response.statusCode).toBe(400)
  })
})
