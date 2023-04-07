import express from "express";
import { RoomController } from "../controllers/roomController";

const router = express.Router();

router
  .route("/rooms")
  .get(RoomController.getAllRooms)
  .post(RoomController.addRoom);

router
  .route("/rooms/:id")
  .get(RoomController.getRoom)
  .put(RoomController.updateRoom)
  .delete(RoomController.deleteRoom);

export default router;
