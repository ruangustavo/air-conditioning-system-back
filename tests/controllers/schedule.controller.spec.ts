import { app } from '@/app'
import { prisma } from '@/lib'
import { type AirConditioner } from '@/models'
import request from 'supertest'
import { describe, it, beforeEach, expect } from 'vitest'

describe('[e2e] ScheduleController', () => {
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
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()

    const scheduleData = {
      start_day_of_week: 0,
      end_day_of_week: 6,
      is_recurrent: true,
      hour: currentHour,
      minute: currentMinute,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/schedule`)
      .send(scheduleData)

    const expectedSchedule = {
      id: expect.any(Number),
      ...scheduleData,
      air_conditioner_id: airConditioner.id,
      created_at: expect.any(String),
      updated_at: expect.any(String)
    }

    expect(response.status).toBe(201)
    expect(response.body.schedule).toMatchObject(expectedSchedule)
  })

  it('should return 400 if start_day_of_week is greater than end_day_of_week', async () => {
    const invalidScheduleData = {
      start_day_of_week: 6,
      end_day_of_week: 0,
      is_recurrent: true,
      hour: 12,
      minute: 0,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/schedule`)
      .send(invalidScheduleData)

    expect(response.status).toBe(400)
  })

  it('should return 400 if hour is out of range (0-23)', async () => {
    const invalidScheduleData = {
      start_day_of_week: 1,
      end_day_of_week: 1,
      is_recurrent: true,
      hour: 24,
      minute: 0,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/schedule`)
      .send(invalidScheduleData)

    expect(response.status).toBe(400)
  })

  it('should return 400 if minute is out of range (0-59)', async () => {
    const invalidScheduleData = {
      start_day_of_week: 1,
      end_day_of_week: 1,
      is_recurrent: true,
      hour: 12,
      minute: 60,
      state: true
    }

    const response = await request(app)
      .post(`/air-conditioners/${airConditioner.id}/schedule`)
      .send(invalidScheduleData)

    expect(response.status).toBe(400)
  })
})
