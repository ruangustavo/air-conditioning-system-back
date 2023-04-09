import express from "express";
import { AirConditionerManagementController } from "../controllers/air-conditioner-controller";
import { airConditionerService } from "../services/air-conditioner-services";
import { mqttService } from "../services/mqtt-services";

const router = express.Router();
const controller = new AirConditionerManagementController(
  airConditionerService,
  mqttService
);

router
  .route("/rooms/:roomId/air-conditioners")
  .get(controller.getAllAirConditioners)
  .post(controller.addAirConditioner);

router
  .route("/rooms/:roomId/air-conditioners/:id")
  .get(controller.getAirConditioner)
  .put(controller.updateAirConditioner)
  .delete(controller.deleteAirConditioner);

router
  .route("/rooms/:roomId/air-conditioners/:id/state")
  .get(controller.getAirConditionerState)
  .put(controller.updateAirConditionerState);

export default router;
