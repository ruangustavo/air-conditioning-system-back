import express from "express";
import { AirConditionerController } from "../controllers/air-conditioner.controller";
import { PrismaAirConditionerRepository } from "../repositories/prisma-air-conditioner.repository";
import { AirConditionerService } from "../services/air-conditioner.service";

const router = express.Router();

const prismaAirConditionerRepository = new PrismaAirConditionerRepository();
const airConditionerService = new AirConditionerService(prismaAirConditionerRepository);
const airConditionerController = new AirConditionerController(airConditionerService);

router
  .route("/")
  .get(airConditionerController.getAllAirConditioners)
  .post(airConditionerController.createAirConditioner)
  .put(airConditionerController.updateOneAirConditioner)
  .delete(airConditionerController.deleteOneAirConditioner);

router
  .route("/:id/state")
  .put(airConditionerController.updateOneAirConditionerState);

export default router;
