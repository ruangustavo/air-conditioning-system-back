import { appMqttClient } from "../mqtt/client";
import { AirConditioner } from "@prisma/client";

class MqttService {
  /**
   * Publishes the state of an air-conditioner to the MQTT broker
   * @param airConditioner Air-conditioner to publish state
   */
  publishAirConditionerState(airConditioner: AirConditioner): void {
    const topic = appMqttClient.getTopic(airConditioner);
    appMqttClient.publish(topic, airConditioner.toggled ? "1" : "0");
  }
}

export const mqttService = new MqttService();
