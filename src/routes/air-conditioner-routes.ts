import express from "express";
import { AirConditionerController } from "../controllers/air-conditioner-controller";

const router = express.Router();
const controller = new AirConditionerController();

router
  .route("/air-conditioners")
  .get(controller.getAllAirConditioners)
  .post(controller.createAirConditioner)
  .put(controller.updateOneAirConditioner)
  .delete(controller.deleteOneAirConditioner);

router
  .route("/air-conditioners/:id/state")
  .put(controller.updateOneAirConditionerState);

export default router;
