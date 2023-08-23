import { describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib'

describe('[e2e] AppointmentController', () => {
  const createRoom = async () => {
    return await prisma.room.create({
      data: {
        name: 'Room'
      }
    })
  }

  it('should create an appoint with valid data successfully', async () => {
    const room = await createRoom()

    const appointment = {
      start_day_of_week: 0,
      end_day_of_week: 0,
      is_recurrent: true,
      hour: 0,
      minute: 0,
      state: true
    }

    const response = await request(app)
      .post(`/rooms/${room.id}/appointments`)
      .send(appointment)

    const expectedAppointment = {
      ...appointment,
      id: expect.any(Number),
      room_id: room.id,
      created_at: expect.any(String),
      updated_at: expect.any(String)
    }

    expect(response.status).toBe(201)
    expect(response.body.appointment).toEqual(expectedAppointment)
  })

  it('should return 400 when try to create an appointment with start day of week greater than end day of week', async () => {
    const room = await createRoom()

    const invalidAppointment = {
      start_day_of_week: 1,
      end_day_of_week: 0,
      is_recurrent: true,
      hour: 0,
      minute: 0,
      state: true
    }

    const response = await request(app)
      .post(`/rooms/${room.id}/appointments`)
      .send(invalidAppointment)

    expect(response.status).toBe(400)
  })
})
