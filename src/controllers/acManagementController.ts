import { appMqttClient } from "../config/mqtt";
import { prisma } from "../db";
import { Request, Response } from "express";

export class AirConditionerManagementController {
  static async getAllAirConditioners(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    const airConditioners = await prisma.airConditioner.findMany({
      where: {
        roomId: roomId,
      },
    });
    res.status(200).json(airConditioners);
  }

  static async addAirConditioner(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    const airConditioner = await prisma.airConditioner.create({
      data: {
        roomId: roomId,
        ...req.body,
      },
    });
    res.status(201).json(airConditioner);
  }

  static async getAirConditioner(req: Request, res: Response) {
    const id = Number(req.params.id);
    const airConditioner = await prisma.airConditioner.findUnique({
      where: {
        id: id,
      },
      include: {
        room: true,
      },
    });

    const roomId = Number(req.params.roomId);
    if (airConditioner?.roomId !== roomId) {
      res.status(404).json({ message: "Air conditioner not found" });
    } else {
      res.status(200).json(airConditioner);
    }
  }

  static async updateAirConditioner(req: Request, res: Response) {
    const id = Number(req.params.id);
    const airConditioner = await prisma.airConditioner.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(airConditioner);
  }

  static async deleteAirConditioner(req: Request, res: Response) {
    const id = Number(req.params.id);
    await prisma.airConditioner.delete({
      where: {
        id: id,
      },
    });
    res.status(201);
  }

  static async getAirConditionerState(req: Request, res: Response) {
    const id = Number(req.params.id);
    const airConditioner = await prisma.airConditioner.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ toggled: airConditioner?.toggled });
  }

  static async updateAirConditionerState(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    const id = Number(req.params.id);

    const airConditioner = await prisma.airConditioner.findUnique({
      where: {
        id: id,
      },
    });

    const newState = !airConditioner?.toggled;

    await prisma.airConditioner.update({
      where: {
        id: id,
      },
      data: {
        toggled: newState,
      },
    });

    appMqttClient.publish(roomId, id, newState);
    res.status(200).json({ toggled: newState });
  }
}
