import { Request, Response } from "express";
import { prisma } from "../db";

export class RoomController {
  static async getAllRooms(_req: Request, res: Response) {
    const rooms = await prisma.room.findMany();
    res.status(200).json(rooms);
  }

  static async addRoom(req: Request, res: Response) {
    const { name, number } = req.body;
    const room = await prisma.room.create({
      data: { name: name, number: number },
    });
    res.status(201).json(room);
  }

  static async getRoom(req: Request, res: Response) {
    const roomId = Number(req.params.id);
    const rooms = await prisma.room.findUnique({ where: { id: roomId } });
    res.status(200).json(rooms);
  }

  static async deleteRoom(req: Request, res: Response) {
    const roomId = Number(req.params.id);
    await prisma.room.delete({ where: { id: roomId } });
    res.status(204);
  }

  static async updateRoom(req: Request, res: Response) {
    const roomId = Number(req.params.id);
    await prisma.room.update({
      where: { id: roomId },
      data: { ...req.body },
    });
    res.status(204);
  }
}
