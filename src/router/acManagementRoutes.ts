import express from "express";
import { AirConditionerManagementController } from "../controllers/acManagementController";

const router = express.Router();

router
  .route("/rooms/:roomId/air-conditioners")
  .get(AirConditionerManagementController.getAllAirConditioners)
  .post(AirConditionerManagementController.addAirConditioner);

router
  .route("/rooms/:roomId/air-conditioners/:id")
  .get(AirConditionerManagementController.getAirConditioner)
  .put(AirConditionerManagementController.updateAirConditioner)
  .delete(AirConditionerManagementController.deleteAirConditioner);

export default router;
