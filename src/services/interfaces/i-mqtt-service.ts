import { AirConditioner } from "@prisma/client";

export interface IMqttInterface {
  publishAirConditionerState(
    airConditioner: AirConditioner,
    state: boolean
  ): void;
}
