import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib'

describe('AirConditionerStateController (e2e)', () => {
  it('should update air conditioner state', async () => {
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
})
