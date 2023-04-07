import { AirConditioner } from "@prisma/client";
import { EventEmitter } from "events";
import mqtt, { connect } from "mqtt";
import { prisma } from "../db";

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://broker.hivemq.com";

class AppMqttClient extends EventEmitter {
  private readonly client: mqtt.MqttClient;

  constructor() {
    super();
    this.client = connect(MQTT_HOST);
    this.setUpCallbacks();
  }

  private setUpCallbacks(): void {
    this.on("connect", () => this.emit("connect"));
    this.on("error", (error) => this.emit("error", error));
    this.on("message", (topic, message) =>
      this.emit("message", topic, message)
    );
  }

  async setUpTopicsSubscription(): Promise<void> {
    const airConditioners = await this.fetchAirConditioners();

    airConditioners.forEach((airConditioner) => {
      const topic = this.getTopic(airConditioner);
      this.client.subscribe(topic);
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  getTopic(airConditioner: AirConditioner): string {
    return `room/${airConditioner.roomId}/air-conditioner/${airConditioner.id}`;
  }

  private async fetchAirConditioners(): Promise<AirConditioner[]> {
    return await prisma.airConditioner.findMany();
  }
}

export const appMqttClient = new AppMqttClient();
