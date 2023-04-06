import { Request, Response } from "express";
import { prisma } from "../db";

export class RoomController {
  static async getAllRooms(_req: Request, res: Response) {
    const rooms = await prisma.room.findMany();
    res.status(200).json(rooms);
  }

  static async getRoomById(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    const rooms = await prisma.room.findUnique({ where: { id: roomId } });
    res.status(200).json(rooms);
  }

  static async getAirConditionersForRoom(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    const airConditioners = await prisma.airConditioner.findMany({
      where: { roomId: roomId },
    });
    res.status(200).json(airConditioners);
  }

  static async createRoom(req: Request, res: Response) {
    const { name, number } = req.body;
    const room = await prisma.room.create({
      data: { name: name, number: number },
    });
    res.status(201).json(room);
  }

  static async deleteRoomById(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    await prisma.room.delete({ where: { id: roomId } });
    res.status(204);
  }

  static async updateRoomById(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    await prisma.room.update({
      where: { id: roomId },
      data: { ...req.body },
    });
    res.status(204);
  }
}
