import { Request, Response } from "express";
import { IRoomService } from "../services/interfaces/i-room-service";
import bindMethods from "../utils/bindMethods";

export class RoomController {
  constructor(private roomService: IRoomService) {
    bindMethods(this);
  }

  /**
   * Get all rooms
   */
  async getAllRooms(_req: Request, res: Response): Promise<void> {
    const rooms = await this.roomService.getRooms();
    res.status(200).json(rooms);
  }

  /**
   * Add a room
   */
  async addRoom(req: Request, res: Response): Promise<void> {
    const room = await this.roomService.addRoom(req.body);
    res.status(201).json(room);
  }

  /**
   * Get a room
   */
  async getRoom(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.id);
    const room = await this.roomService.getRoomById(roomId);
    res.status(200).json(room);
  }

  /**
   * Delete a room
   */
  async deleteRoom(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.id);
    await this.roomService.deleteRoom(roomId);
    res.status(204).send();
  }

  /**
   * Update a room
   */
  async updateRoom(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.id);
    await this.roomService.updateRoom(roomId, req.body);
    res.status(204).send();
  }
}
