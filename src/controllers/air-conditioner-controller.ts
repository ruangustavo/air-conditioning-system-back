import { Request, Response } from "express";
import { AirConditioner } from "../models/air-conditioner";
import { appMqttClient } from "../mqtt/client";

export class AirConditionerController {
  getAllAirConditioners = async (_req: Request, res: Response) => {
    const airConditioners = await AirConditioner.getAll();
    res.json(airConditioners);
  };

  getOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const airConditioner = await AirConditioner.getOne(id);
    res.json(airConditioner);
  };

  createAirConditioner = async (req: Request, res: Response) => {
    const airConditioner = req.body;
    const newAirConditioner = await AirConditioner.create(airConditioner);
    res.json(newAirConditioner);
  };

  updateOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const airConditioner = req.body;
    const updatedAirConditioner = await AirConditioner.update(
      id,
      airConditioner
    );
    res.json(updatedAirConditioner);
  };

  deleteOneAirConditioner = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedAirConditioner = await AirConditioner.delete(id);
    res.json(deletedAirConditioner);
  };

  updateOneAirConditionerState = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const state = req.body.state;
    appMqttClient.publish(`air-conditioner/${id}/state`, state ? "1" : "0");
    res.json({ message: "State updated successfully!" });
  };
}
