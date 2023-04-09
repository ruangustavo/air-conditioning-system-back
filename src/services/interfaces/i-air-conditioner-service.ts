import { AirConditioner } from "@prisma/client";

export type AirConditionerProps = Omit<AirConditioner, "id" | "roomId">;
export type AirConditionerStateProps = Pick<AirConditioner, "toggled" | "id">;

export interface IAirConditionerService {
  getAirConditionerById(id: number): Promise<AirConditioner | null>;
  getAirConditionerState(id: number): Promise<boolean>;
  addAirConditioner(
    roomId: number,
    airConditioner: AirConditionerProps
  ): Promise<AirConditioner>;
  updateAirConditioner(id: number, data: AirConditionerProps): Promise<void>;
  deleteAirConditioner(id: number): Promise<void>;
  getAllAirConditionersByRoomId(roomId: number): Promise<AirConditioner[]>;
  getAirConditionerByRoomId(roomId: number): Promise<AirConditioner[]>;
  updateAirConditionerState(
    props: AirConditionerStateProps
  ): Promise<AirConditioner>;
}
