import { Request, Response } from "express";
import { IAirConditionerService } from "../services/interfaces/i-air-conditioner-service";
import { IMqttInterface } from "../services/interfaces/i-mqtt-service";
import bindMethods from "../utils/bindMethods";

export class AirConditionerManagementController {
  constructor(
    private airConditionerService: IAirConditionerService,
    private mqttService: IMqttInterface
  ) {
    bindMethods(this);
  }

  /**
   * Get all air conditioners
   */
  async getAllAirConditioners(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.roomId);
    const airConditioners =
      await this.airConditionerService.getAllAirConditionersByRoomId(roomId);
    res.status(200).json(airConditioners);
  }

  /**
   * Add a new air conditioner
   */
  async addAirConditioner(req: Request, res: Response): Promise<void> {
    const roomId = Number(req.params.roomId);
    const airConditioner = await this.airConditionerService.addAirConditioner(
      roomId,
      req.body
    );
    res.status(201).json(airConditioner);
  }

  /**
   * Get a specific air conditioner
   */
  async getAirConditioner(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const airConditioners =
      await this.airConditionerService.getAirConditionerById(id);

    if (!airConditioners) {
      res.status(404).json({ message: "Air conditioner not found" });
    }

    res.status(200).json(airConditioners);
  }

  /**
   * Update a specific air conditioner
   */
  async updateAirConditioner(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const airConditioner =
      await this.airConditionerService.updateAirConditioner(id, req.body);
    res.status(200).json(airConditioner);
  }

  /**
   * Delete a specific air conditioner
   */
  async deleteAirConditioner(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await this.airConditionerService.deleteAirConditioner(id);
    res.status(204).json({ message: "Air conditioner deleted" });
  }

  /**
   * Get air conditioner state
   */
  async getAirConditionerState(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const airConditionerState =
      await this.airConditionerService.getAirConditionerState(id);
    res.status(200).json({ toggled: airConditionerState });
  }

  /**
   * Update air conditioner state
   */
  async updateAirConditionerState(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const toggled = req.body.toggled;

    const airConditioner =
      await this.airConditionerService.updateAirConditionerState({
        id,
        toggled,
      });

    this.mqttService.publishAirConditionerState(airConditioner, toggled);
    res.status(200).json(airConditioner);
  }
}
