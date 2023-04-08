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

  /**
   * Sets up the callbacks for the MQTT client.
   */
  private setUpCallbacks(): void {
    this.on("connect", () => this.emit("connect"));
    this.on("error", (error) => this.emit("error", error));
    this.on("message", (topic, message) =>
      this.emit("message", topic, message)
    );
  }

  /**
   * Sets up the air-conditioners topics subscription for the MQTT client.
   */
  async setUpTopicsSubscription(): Promise<void> {
    const airConditioners = await this.fetchAirConditioners();

    airConditioners.forEach((airConditioner) => {
      const topic = this.getTopic(airConditioner);
      this.client.subscribe(topic);
    });
  }

  /**
   * Publishes a message to a topic.
   * @param topic The topic to publish the message to.
   * @param message The message to publish.
   */
  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  /**
   * Gets the topic for an air conditioner.
   * @param airConditioner Air conditioner to get the topic from.
   * @returns The topic for the air conditioner.
   */
  getTopic(airConditioner: AirConditioner): string {
    return `room/${airConditioner.roomId}/air-conditioner/${airConditioner.id}`;
  }

  /**
   * Fetches the air-conditioners from the database.
   * @returns The air-conditioners from the database.
   */
  private async fetchAirConditioners(): Promise<AirConditioner[]> {
    return await prisma.airConditioner.findMany();
  }
}

export const appMqttClient = new AppMqttClient();
