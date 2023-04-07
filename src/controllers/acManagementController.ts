import { Request, Response } from "express";
import { airConditionerService } from "../services/airConditionerService";
import { mqttService } from "../services/mqttService";

export class AirConditionerManagementController {
  static async getAllAirConditioners(
    req: Request,
    res: Response
  ): Promise<void> {
    const roomId = Number(req.params.roomId);
    const airConditioners = await airConditionerService.getAllAirConditioners(
      roomId
    );
    res.status(200).json(airConditioners);
  }

  static async addAirConditioner(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.roomId);
    const airConditioner = await airConditionerService.addAirConditioner(
      roomId,
      req.body
    );
    res.status(201).json(airConditioner);
  }

  static async getAirConditioner(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const airConditioners = await airConditionerService.getAirConditionerById(
      id
    );

    if (!airConditioners) {
      res.status(404).json({ message: "Air conditioner not found" });
    }

    res.status(200).json(airConditioners);
  }

  static async updateAirConditioner(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = Number(req.params.id);
    const airConditioner = await airConditionerService.updateAirConditioner(
      id,
      req.body
    );
    res.status(200).json(airConditioner);
  }

  static async deleteAirConditioner(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = Number(req.params.id);
    await airConditionerService.deleteAirConditioner(id);
    res.status(204).json({ message: "Air conditioner deleted" });
  }

  static async getAirConditionerState(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = Number(req.params.id);
    const airConditionerState =
      await airConditionerService.getAirConditionerState(id);
    res.status(200).json({ toggled: airConditionerState });
  }

  static async updateAirConditionerState(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = Number(req.params.id);
    const toggled = req.body.toggled;

    const airConditioner =
      await airConditionerService.updateAirConditionerState(id, toggled);

    mqttService.publishAirConditionerState(airConditioner);
    res.status(200).json(airConditioner);
  }
}
