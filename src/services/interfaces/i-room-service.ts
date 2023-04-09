import { Room } from "@prisma/client";

export interface IRoomService {
  getRooms(): Promise<Room[]>;
  getRoomById(id: number): Promise<Room | null>;
  addRoom(room: Room): Promise<Room>;
  updateRoom(id: number, room: Room): Promise<void>;
  deleteRoom(id: number): Promise<void>;
}
