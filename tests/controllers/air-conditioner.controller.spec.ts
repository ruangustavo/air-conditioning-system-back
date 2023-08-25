import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib'

describe('[e2e] AirConditionerController', () => {
  const createRoom = async () => {
    const room = await prisma.room.create({
      data: {
        name: 'Room'
      }
    })
    return room
  }

  const createAirConditioner = async () => {
    const { id } = await createRoom()

    return await prisma.airConditioner.create({
      data: {
        brand: 'Air-conditioner Brand',
        model: 'Air-conditioner Model',
        room: {
          connect: {
            id
          }
        }
      }
    })
  }

  it('should return list of air-conditioners successfully ', async () => {
    await createAirConditioner()

    const response = await request(app)
      .get('/air-conditioners')

    expect(response.status).toBe(200)
    expect(response.body.air_conditioners).toHaveLength(1)
  })

  it('should return an air-conditioner by id successfully', async () => {
    const airConditioner = await createAirConditioner()

    const response = await request(app)
      .get(`/air-conditioners/${airConditioner.id}`)

    expect(response.status).toBe(200)
  })

  it('should update an air-conditioner with valid data successfully', async () => {
    const airConditioner = await createAirConditioner()

    const newAirConditionerData = {
      brand: 'Updated Brand',
      model: 'Updated Model'
    }

    const response = await request(app)
      .put(`/air-conditioners/${airConditioner.id}`)
      .send(newAirConditionerData)

    expect(response.status).toBe(200)
    expect(response.body.air_conditioner.brand).toBe(newAirConditionerData.brand)
    expect(response.body.air_conditioner.model).toBe(newAirConditionerData.model)
  })

  it('should delete an air-conditioner successfully', async () => {
    const airConditioner = await createAirConditioner()

    const response = await request(app)
      .delete(`/air-conditioners/${airConditioner.id}`)

    expect(response.status).toBe(200)
  })

  it('should update air-conditioner state successfully', async () => {
    const airConditioner = await createAirConditioner()

    const response = await request(app)
      .put(`/air-conditioners/${airConditioner.id}/state`)
      .send({ state: true })

    expect(response.status).toBe(200)
    expect(response.body.air_conditioner.is_active).toBe(true)
  })
})
