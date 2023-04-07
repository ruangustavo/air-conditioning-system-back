import { appMqttClient } from "../mqtt/client";
import { AirConditioner } from "@prisma/client";

class MqttService {
  publishAirConditionerState(airConditioner: AirConditioner): void {
    const topic = appMqttClient.getTopic(airConditioner);
    appMqttClient.publish(topic, airConditioner.toggled ? "1" : "0");
  }
}

export const mqttService = new MqttService();
