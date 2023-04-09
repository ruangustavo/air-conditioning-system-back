import { prisma } from "../db";
import { Room } from "@prisma/client";
import { IRoomService } from "./interfaces/i-room-service";

class RoomService implements IRoomService {
  /**
   * Get all rooms
   * @returns All rooms
   */
  async getRooms(): Promise<Room[]> {
    return await prisma.room.findMany();
  }

  /**
   * Add a room
   * @param room Room to add
   * @returns Added room
   */
  async addRoom(room: Room): Promise<Room> {
    return await prisma.room.create({ data: { ...room } });
  }

  /**
   * Get a room by id
   * @param id Room id
   * @returns Room with id or null if not found
   */
  async getRoomById(id: number): Promise<Room | null> {
    return await prisma.room.findUnique({ where: { id: id } });
  }

  /**
   * Update a room
   * @param id Room id
   * @param room Room to update
   * @returns Updated room
   */
  async updateRoom(id: number, room: Room): Promise<void> {
    await prisma.room.update({
      where: { id: id },
      data: { ...room },
    });
  }

  /**
   * Delete a room
   * @param id Room id
   */
  async deleteRoom(id: number): Promise<void> {
    await prisma.room.delete({ where: { id: id } });
  }
}

export const roomServices = new RoomService();
