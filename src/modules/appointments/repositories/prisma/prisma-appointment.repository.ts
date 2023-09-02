import { prisma } from "@/infra/database/prisma";
import { AppointmentRepository } from "../appointment.repository";
import { Prisma, Appointment } from "@prisma/client";

export class PrismaAppointmentRepository implements AppointmentRepository{

  save = async (appointment: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment> => {
    const createdAppointment = await prisma.appointment.create({ data: appointment })
    return createdAppointment
  }

}
