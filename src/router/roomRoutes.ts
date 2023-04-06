import express from "express";
import { RoomController } from "../controllers/roomController";

export const roomRouter = express.Router();

roomRouter.get("/rooms", RoomController.getAllRooms);
roomRouter.get("/rooms/:roomId", RoomController.getRoomById);
roomRouter.post("/rooms", RoomController.createRoom);
roomRouter.put("/rooms/:roomId", RoomController.deleteRoomById);
roomRouter.delete("/rooms/:roomId", RoomController.deleteRoomById);
