import { Request, Response } from "express";
import { AirConditionerService } from "../services/air-conditioner.service";
import { mqttClient } from "../lib/mqtt";

/**
 * This controller is responsible for handling the requests for the air-conditioners.
 * It is used by the routes to get the data from the services.
 */

const TURN_ON_AIR_CONDITIONER_COMMAND = "1";
const TURN_OFF_AIR_CONDITIONER_COMMAND = "0";

export class AirConditionerController {
  constructor(private airConditionerService: AirConditionerService) {}

  getAllAirConditioners = async (_req: Request, res: Response) => {
    const airConditioners = await this.airConditionerService.getAll();
    res.json(airConditioners);
  };

  getOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const airConditioner = await this.airConditionerService.getOne(id);
    res.json(airConditioner);
  };

  createAirConditioner = async (req: Request, res: Response) => {
    const airConditioner = req.body;
    const newAirConditioner = await this.airConditionerService.create(
      airConditioner
    );
    res.json(newAirConditioner);
  };

  updateOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const airConditioner = req.body;
    const updatedAirConditioner = await this.airConditionerService.update(
      id,
      airConditioner
    );
    res.json(updatedAirConditioner);
  };

  deleteOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedAirConditioner = await this.airConditionerService.delete(id);
    res.json(deletedAirConditioner);
  };

  updateOneAirConditionerState = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const state = req.body.state;
    mqttClient.publish(
      `air-conditioner/${id}/state`,
      state ? TURN_ON_AIR_CONDITIONER_COMMAND : TURN_OFF_AIR_CONDITIONER_COMMAND
    );
    res.json({ message: "State updated successfully!" });
  };
}
