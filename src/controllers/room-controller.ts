import { Request, Response } from "express";
import { roomServices } from "../services/room-services";

export class RoomController {
  /**
   * Get all rooms
   */
  static async getAllRooms(_req: Request, res: Response): Promise<void> {
    const rooms = await roomServices.getAllRooms();
    res.status(200).json(rooms);
  }
  /**
   * Add a room
   */
  static async addRoom(req: Request, res: Response): Promise<void> {
    const room = await roomServices.addRoom(req.body);
    res.status(201).json(room);
  }

  /**
   * Get a room
   */
  static async getRoom(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.id);
    const room = await roomServices.getRoomById(roomId);
    res.status(200).json(room);
  }

  /**
   * Delete a room
   */
  static async deleteRoom(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.id);
    await roomServices.deleteRoom(roomId);
    res.status(204).send();
  }

  /**
   * Update a room
   */
  static async updateRoom(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.id);
    await roomServices.updateRoom(roomId, req.body);
    res.status(204).send();
  }
}
