import express from "express";
import { RoomController } from "../controllers/room-controller";
import { roomServices } from "../services/room-services";

const router = express.Router();
const controller = new RoomController(roomServices);

router.route("/rooms").get(controller.getAllRooms).post(controller.addRoom);

router
  .route("/rooms/:id")
  .get(controller.getRoom)
  .put(controller.updateRoom)
  .delete(controller.deleteRoom);

export default router;
