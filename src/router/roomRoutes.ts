import express from "express";
import { RoomController } from "../controllers/roomController";

export const roomRouter = express.Router();

roomRouter
  .route("/rooms")
  .get(RoomController.getAllRooms)
  .post(RoomController.addRoom);

roomRouter
  .route("/rooms/:id")
  .get(RoomController.getRoom)
  .put(RoomController.updateRoom)
  .delete(RoomController.deleteRoom);
