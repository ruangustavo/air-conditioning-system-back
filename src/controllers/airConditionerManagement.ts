import { prisma } from "../db";
import { Request, Response } from "express";

export class AirConditionerManagementController {
  static getAllAirConditioners(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    const airConditioners = prisma.airConditioner.findMany({
      where: {
        roomId: roomId,
      },
    });
    res.status(200).json(airConditioners);
  }

  static addAirConditioner(req: Request, res: Response) {
    const roomId = Number(req.params.roomId);
    const airConditioner = prisma.airConditioner.create({
      data: {
        roomId: roomId,
        ...req.body,
      },
    });
    res.status(201).json(airConditioner);
  }
}
