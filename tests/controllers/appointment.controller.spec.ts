import { app } from '@/app'
import { prisma } from '@/lib'
import { type AirConditioner } from '@prisma/client'
import request from 'supertest'
import { describe, it, beforeEach, expect } from 'vitest'

describe('[e2e] AppointmentController', () => {
  let airConditioner: AirConditioner

  beforeEach(async () => {
    airConditioner = await prisma.airConditioner.create({
      data: {
        model: 'Air Conditioner',
        brand: 'Brand'
      }
    })
  })

  it('should schedule an air-conditioner turn on with valid data', async () => {
    const appointmentData = {
      start_day_of_week: 1,
      end_day_of_week: 1,
      is_recurrent: true,
      hour: 12,
      minute: 0,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/appointment`)
      .send(appointmentData)

    const expectedAppointment = {
      id: expect.any(Number),
      ...appointmentData,
      air_conditioner_id: airConditioner.id,
      created_at: expect.any(String),
      updated_at: expect.any(String)
    }

    expect(response.status).toBe(201)
    expect(response.body.appointment).toMatchObject(expectedAppointment)
  })

  it('should return 400 if start_day_of_week is greater than end_day_of_week', async () => {
    const invalidAppointmentData = {
      start_day_of_week: 6,
      end_day_of_week: 0,
      is_recurrent: true,
      hour: 12,
      minute: 0,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/appointment`)
      .send(invalidAppointmentData)

    expect(response.status).toBe(400)
  })

  it('should return 400 if hour is out of range (0-23)', async () => {
    const invalidAppointmentData = {
      start_day_of_week: 1,
      end_day_of_week: 1,
      is_recurrent: true,
      hour: 24,
      minute: 0,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/appointment`)
      .send(invalidAppointmentData)

    expect(response.status).toBe(400)
  })

  it('should return 400 if minute is out of range (0-59)', async () => {
    const invalidAppointmentData = {
      start_day_of_week: 1,
      end_day_of_week: 1,
      is_recurrent: true,
      hour: 12,
      minute: 60,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/appointment`)
      .send(invalidAppointmentData)

    expect(response.status).toBe(400)
  })
})
