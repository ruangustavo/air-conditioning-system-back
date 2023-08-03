import express from "express";
import { AirConditionerController } from "../controllers/air-conditioner.controller";
import { validateBodyRequest } from "../middlewares/validate-body-request.middleware";
import { PrismaAirConditionerRepository } from "../repositories/prisma-air-conditioner.repository";
import {
  createAirConditionerSchema,
  deleteAirConditionerSchema,
  updateAirConditionerSchema,
  updateAirConditionerStateSchema,
} from "../schemas/air-conditioner.schema";
import { AirConditionerService } from "../services/air-conditioner.service";

const router = express.Router();

const prismaAirConditionerRepository = new PrismaAirConditionerRepository();
const airConditionerService = new AirConditionerService(
  prismaAirConditionerRepository
);
const airConditionerController = new AirConditionerController(
  airConditionerService
);

router
  .route("/")
  .get(airConditionerController.getAllAirConditioners)
  .post(
    validateBodyRequest(createAirConditionerSchema),
    airConditionerController.createAirConditioner
  );

router
  .route("/:id")
  .put(
    validateBodyRequest(updateAirConditionerSchema),
    airConditionerController.updateOneAirConditioner
  )
  .delete(
    validateBodyRequest(deleteAirConditionerSchema),
    airConditionerController.deleteOneAirConditioner
  );

router
  .route("/:id/state")
  .put(
    validateBodyRequest(updateAirConditionerStateSchema),
    airConditionerController.updateOneAirConditionerState
  );

export default router;
