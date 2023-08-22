import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib'

describe('[e2e] RoomController', () => {
  const room = {
    name: 'Room'
  }

  const createRoom = async () => {
    return await prisma.room.create({
      data: room
    })
  }

  const createAirConditioner = async (roomId: number) => {
    return await prisma.airConditioner.create({
      data: {
        brand: 'Air-Conditioner Brand',
        model: 'Air-Conditioner Model',
        room: {
          connect: {
            id: roomId
          }
        }
      }
    })
  }

  it('should create a new room with valid data successfully', async () => {
    const response = await request(app)
      .post('/rooms')
      .send(room)

    const expectedAirConditioner = {
      ...room,
      id: expect.any(Number),
      updated_at: expect.any(String),
      created_at: expect.any(String)
    }

    expect(response.status).toBe(201)
    expect(response.body.room).toMatchObject(expectedAirConditioner)
  })

  it('should return 400 when trying to create a new room with invalid data', async () => {
    const invalidRoom = {
      name: ''
    }

    const response = await request(app)
      .post('/rooms')
      .send(invalidRoom)

    expect(response.status).toBe(400)
  })

  it('should add air-conditioner with valid data to a room successfully', async () => {
    const room = await createRoom()
    const airConditioner = await createAirConditioner(room.id)

    const response = await request(app)
      .post(`/rooms/${room.id}/air-conditioners`)
      .send(airConditioner)

    const expectedAirConditioner = {
      ...airConditioner,
      id: expect.any(Number),
      updated_at: expect.any(String),
      created_at: expect.any(String)
    }

    expect(response.status).toBe(201)
    expect(response.body.air_conditioner).toMatchObject(expectedAirConditioner)
  })

  it('should return 400 when trying to add air-conditioner to a room with invalid data', async () => {
    const room = await createRoom()
    const invalidAirConditioner = {
      brand: '',
      model: ''
    }

    const response = await request(app)
      .post(`/rooms/${room.id}/air-conditioners`)
      .send(invalidAirConditioner)

    expect(response.status).toBe(400)
  })

  it('should return air-conditioners from a room successfully', async () => {
    const room = await createRoom()
    const airConditioner = await createAirConditioner(room.id)

    const response = await request(app)
      .get(`/rooms/${room.id}/air-conditioners`)

    const expectedAirConditioner = {
      ...airConditioner,
      id: expect.any(Number),
      updated_at: expect.any(String),
      created_at: expect.any(String)
    }

    expect(response.status).toBe(200)
    expect(response.body.air_conditioners).toMatchObject([expectedAirConditioner])
  })

  it('should create an appointment with valid data successfully', async () => {
    const room = await createRoom()

    const appointment = {
      hour: 10,
      minute: 30,
      start_day_of_week: 1,
      end_day_of_week: 5,
      is_recurrent: false,
      state: true
    }

    const expectedAppointment = {
      ...appointment,
      id: expect.any(Number),
      updated_at: expect.any(String),
      created_at: expect.any(String)
    }

    const response = await request(app)
      .post(`/rooms/${room.id}/appointments`)
      .send(appointment)

    expect(response.status).toBe(201)
    expect(response.body.appointment).toMatchObject(expectedAppointment)
  })
})
