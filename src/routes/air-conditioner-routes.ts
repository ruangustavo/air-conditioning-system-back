import express from "express";
import { AirConditionerManagementController } from "../controllers/air-conditioner-controller";

const router = express.Router();
const controller = new AirConditionerManagementController();

router
  .route("/air-conditioners")
  .get(controller.getAllAirConditioners)
  .post(controller.createAirConditioner)
  .put(controller.updateAirConditioner)
  .delete(controller.deleteAirConditioner);

router
  .route("/air-conditioners/:id/state")
  .put(controller.updateAirConditionerState);

export default router;
