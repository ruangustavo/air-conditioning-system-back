import { prisma } from "../db";
import { Room } from "@prisma/client";

class RoomServices {
  async getAllRooms(): Promise<Room[]> {
    return await prisma.room.findMany();
  }

  async addRoom(room: Room): Promise<Room> {
    return await prisma.room.create({ data: { ...room } });
  }

  async getRoomById(id: number): Promise<Room | null> {
    return await prisma.room.findUnique({ where: { id: id } });
  }

  async updateRoom(id: number, room: Room): Promise<void> {
    await prisma.room.update({
      where: { id: id },
      data: { ...room },
    });
  }

  async deleteRoom(id: number): Promise<void> {
    await prisma.room.delete({ where: { id: id } });
  }
}

export const roomServices = new RoomServices();
