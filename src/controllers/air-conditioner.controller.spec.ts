import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib'

describe('AirConditionerController (e2e)', () => {
  it('should get all air conditioners', async () => {
    const response = await request(app).get('/air-conditioners')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it('should create a air conditioners', async () => {
    const airConditioner = {
      model: 'Air Conditioner',
      brand: 'Brand'
    }

    const response = await request(app).post('/air-conditioners').send(airConditioner)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        model: airConditioner.model,
        brand: airConditioner.brand,
        updated_at: expect.any(String),
        created_at: expect.any(String)
      })
    )
  })

  it('should get a air conditioners', async () => {
    const airConditioner = await prisma.airConditioner.create({
      data: {
        model: 'Air Conditioner',
        brand: 'Brand'
      }
    })

    const response = await request(app).get(`/air-conditioners/${airConditioner.id}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        model: airConditioner.model,
        brand: airConditioner.brand,
        updated_at: expect.any(String),
        created_at: expect.any(String)
      })
    )
  })

  it('should update a air conditioners', async () => {
    const airConditioner = await prisma.airConditioner.create({
      data: {
        model: 'Air Conditioner',
        brand: 'Brand'
      }
    })

    const response = await request(app).put(`/air-conditioners/${airConditioner.id}`).send({
      model: 'Air Conditioner 2',
      brand: 'Brand 2'
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        model: 'Air Conditioner 2',
        brand: 'Brand 2',
        updated_at: expect.any(String),
        created_at: expect.any(String)
      }))
  })

  it('should delete a air conditioners', async () => {
    const airConditioner = await prisma.airConditioner.create({
      data: {
        model: 'Air Conditioner',
        brand: 'Brand'
      }
    })

    const response = await request(app).delete(`/air-conditioners/${airConditioner.id}`)
    expect(response.status).toBe(200)
  })
})
