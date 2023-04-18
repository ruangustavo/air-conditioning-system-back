import express from "express";
import { AirConditionerController } from "../controllers/air-conditioner-controller";

const router = express.Router();

router
  .route("/")
  .get(AirConditionerController.getAllAirConditioners)
  .post(AirConditionerController.createAirConditioner)
  .put(AirConditionerController.updateOneAirConditioner)
  .delete(AirConditionerController.deleteOneAirConditioner);

router
  .route("/:id/state")
  .put(AirConditionerController.updateOneAirConditionerState);

export default router;
