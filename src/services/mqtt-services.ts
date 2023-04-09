import { appMqttClient } from "../mqtt/client";
import { AirConditioner } from "@prisma/client";
import { IMqttInterface } from "./interfaces/i-mqtt-service";

class MqttService implements IMqttInterface {
  /**
   * Publishes the state of an air-conditioner to the MQTT broker
   * @param airConditioner Air-conditioner to publish state
   */
  publishAirConditionerState(
    airConditioner: AirConditioner,
    state: boolean
  ): void {
    const topic = appMqttClient.getTopic(airConditioner);
    appMqttClient.publish(topic, state ? "1" : "0");
  }
}

export const mqttService = new MqttService();
