import express from "express";
import { AirConditionerManagementController } from "../controllers/airConditionerManagement";

const router = express.Router();

router
  .route("/rooms/:roomId/air-conditioners")
  .get(AirConditionerManagementController.getAllAirConditioners)
  .post(AirConditionerManagementController.addAirConditioner);

export default router;
