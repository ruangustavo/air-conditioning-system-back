import { appMqttClient } from "../mqtt/client";
import { AirConditioner } from "@prisma/client";

class MqttService {
  publishAirConditionerState(
    airConditioner: AirConditioner,
    state: boolean
  ): void {
    const topic = appMqttClient.getTopic(airConditioner);
    appMqttClient.publish(topic, state ? "1" : "0");
  }
}

export const mqttService = new MqttService();
