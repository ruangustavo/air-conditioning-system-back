import mqtt from "mqtt";
import { prisma } from "../db";
import { onConnect, onMessage } from "./callbacks";

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://broker.hivemq.com";

class AppMqttClient {
  private readonly client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect(MQTT_HOST);
  }

  setUpCallbacks(): void {
    this.client.on("connect", onConnect);
    this.client.on("message", onMessage);
  }

  async setUpTopicsSubscription() {
    const airConditioners = await prisma.airConditioner.findMany();

    airConditioners.forEach((airConditioner) => {
      const topic = `room/${airConditioner.roomId}/air-conditioner/${airConditioner.id}/state`;
      console.log(`Subscribing to ${topic}`);
      this.client.subscribe(topic);
    });
  }

  publish(roomId: number, airConditionerId: number, toggled: boolean) {
    const topic = `room/${roomId}/air-conditioner/${airConditionerId}/state`;
    this.client.publish(topic, toggled ? "1" : "0");
  }
}

export const appMqttClient = new AppMqttClient();
