import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib'

describe('[e2e] AirConditionerController', () => {
  it('should retrieve an empty list of air conditioners when none exist', async () => {
    const response = await request(app).get('/air-conditioners')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it('should successfully create a new air conditioner', async () => {
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

  it('should retrieve an existing air conditioner by its ID', async () => {
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
        id: airConditioner.id,
        model: 'Air Conditioner',
        brand: 'Brand',
        updated_at: expect.any(String),
        created_at: expect.any(String)
      })
    )
  })

  it('should update an existing air conditioner with new data', async () => {
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
        id: airConditioner.id,
        model: 'Air Conditioner 2',
        brand: 'Brand 2',
        updated_at: expect.any(String),
        created_at: expect.any(String)
      })
    )
  })

  it('should delete an existing air conditioner', async () => {
    const airConditioner = await prisma.airConditioner.create({
      data: {
        model: 'Air Conditioner',
        brand: 'Brand'
      }
    })

    const response = await request(app).delete(`/air-conditioners/${airConditioner.id}`)
    expect(response.status).toBe(200)
  })

  it('should handle retrieval of a non-existent air conditioner', async () => {
    const nonExistentId = 999999
    const response = await request(app).get(`/air-conditioners/${nonExistentId}`)
    expect(response.status).toBe(404)
  })

  it('should handle empty input during air conditioner creation', async () => {
    const invalidAirConditioner = {
      model: '',
      brand: ''
    }

    const response = await request(app)
      .post('/air-conditioners')
      .send(invalidAirConditioner)

    expect(response.status).toBe(400)
  })

  it('should handle invalid input during air conditioner creation', async () => {
    const invalidAirConditioner = {
      model: 123,
      brand: 123
    }

    const response = await request(app)
      .post('/air-conditioners')
      .send(invalidAirConditioner)

    expect(response.status).toBe(400)
  })

  it('should handle updating a non-existent air conditioner', async () => {
    const nonExistentId = 999999
    const response = await request(app)
      .put(`/air-conditioners/${nonExistentId}`)
      .send({
        model: 'Updated Model',
        brand: 'Updated Brand'
      })
    expect(response.status).toBe(404)
  })

  it('should handle deleting a non-existent air conditioner', async () => {
    const nonExistentId = 999999
    const response = await request(app).delete(`/air-conditioners/${nonExistentId}`)
    expect(response.status).toBe(404)
  })

  it('should handle retrieval of an air conditioner with an invalid ID', async () => {
    const response = await request(app).get('/air-conditioners/invalid-id')
    expect(response.status).toBe(400)
  })
})
