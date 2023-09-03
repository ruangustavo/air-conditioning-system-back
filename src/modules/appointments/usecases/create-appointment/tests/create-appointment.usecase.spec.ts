import { describe, it, expect, beforeEach } from 'vitest'
import { CreateAppointmentUsecase } from '../create-appointment.usecase'
import { InMemoryAppointmentRepository } from '@/modules/appointments/repositories/in-memory/in-memory-appointment.repository'
import { InMemoryRoomRepository } from '@/modules/room/repositories/in-memory/in-memory-room.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { InMemoryAirConditionerRepository } from '@/modules/air-conditioner/repositories/in-memory/in-memory-air-conditioner.repository'

let appointmentRepository: InMemoryAppointmentRepository
let roomRepository: InMemoryRoomRepository
let airConditionerRepository: InMemoryAirConditionerRepository
let sut: CreateAppointmentUsecase

describe('CreateAppointmentUsecase', () => {
  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository()
    roomRepository = new InMemoryRoomRepository()
    airConditionerRepository = new InMemoryAirConditionerRepository()
    sut = new CreateAppointmentUsecase(
      appointmentRepository, roomRepository, airConditionerRepository
    )
  })

  it('should create an appointment with valid data successfully', async () => {
    const roomData = {
      name: 'Room 1',
      description: 'Room 1 description',
      state: true
    }

    const appointmentData = {
      hour: 10,
      minute: 30,
      roomId: 1,
      startDayOfWeek: 1,
      endDayOfWeek: 1,
      state: true
    }

    await roomRepository.save(roomData)
    const createdAppointment = await sut.execute(appointmentData)

    expect(createdAppointment).not.toBeNull()
    expect(createdAppointment).toHaveProperty('id')
  })

  it("should throw ResourceNotFoundError if room doesn't exist", async () => {
    const appointmentData = {
      hour: 10,
      minute: 30,
      roomId: 1,
      startDayOfWeek: 1,
      endDayOfWeek: 1,
      state: true
    }

    const promise = sut.execute(appointmentData)
    await expect(promise).rejects.toThrowError(ResourceNotFoundError)
  })
})
