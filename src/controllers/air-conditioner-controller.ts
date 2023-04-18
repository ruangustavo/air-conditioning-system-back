import { Request, Response } from "express";
import { AirConditionerService } from "../services/air-conditioner-service";
import { mqttClient } from "../mqtt/client";

/**
 * This controller is responsible for handling the requests for the air-conditioners.
 * It is used by the routes to get the data from the services.
 */

export class AirConditionerController {
  static getAllAirConditioners = async (_req: Request, res: Response) => {
    const airConditioners = await AirConditionerService.getAll();
    res.json(airConditioners);
  };

  static getOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const airConditioner = await AirConditionerService.getOne(id);
    res.json(airConditioner);
  };

  static createAirConditioner = async (req: Request, res: Response) => {
    const airConditioner = req.body;
    const newAirConditioner = await AirConditionerService.create(
      airConditioner
    );
    res.json(newAirConditioner);
  };

  static updateOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const airConditioner = req.body;
    const updatedAirConditioner = await AirConditionerService.update(
      id,
      airConditioner
    );
    res.json(updatedAirConditioner);
  };

  static deleteOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedAirConditioner = await AirConditionerService.delete(id);
    res.json(deletedAirConditioner);
  };

  static updateOneAirConditionerState = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const state = req.body.state;
    mqttClient.publish(`air-conditioner/${id}/state`, state ? "1" : "0");
    res.json({ message: "State updated successfully!" });
  };
}
