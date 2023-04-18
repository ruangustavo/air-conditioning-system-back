import { EventEmitter } from "events";
import mqtt, { connect } from "mqtt";

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://broker.hivemq.com";

class MqttClient extends EventEmitter {
  private readonly client: mqtt.MqttClient;

  constructor() {
    super();
    this.client = connect(MQTT_HOST);
    this.setUpCallbacks();
  }

  private setUpCallbacks = () => {
    this.on("connect", () => this.emit("connect"));
    this.on("error", (error) => this.emit("error", error));
    this.on("message", (topic, message) =>
      this.emit("message", topic, message)
    );
  };

  publish = (topic: string, message: string): void => {
    this.client.publish(topic, message);
  };
}

export const mqttClient = new MqttClient();
