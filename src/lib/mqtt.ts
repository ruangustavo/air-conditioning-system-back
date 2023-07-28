import mqtt, { IClientOptions } from "mqtt";

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://broker.hivemq.com";

interface MqttEvents {
  onConnect: () => void;
  onError: (error: Error) => void;
  onMessage: (topic: string, message: Buffer) => void;
}

const createMqttCallbacks = (): MqttEvents => {
  const onConnect = () => {
    console.log("Connected to MQTT broker");
  };

  const onError = (error: Error) => {
    console.log("Error connecting to MQTT broker", error);
  };

  const onMessage = (topic: string, message: Buffer) => {
    console.log(`Received message on topic ${topic}: ${message}`);
  };

  return { onConnect, onError, onMessage };
}

const createMqttClient = (options?: IClientOptions) => {
  const mqttClient = mqtt.connect(MQTT_HOST, options);
  const mqttCallbacks = createMqttCallbacks();

  mqttClient.on("connect", mqttCallbacks.onConnect);
  mqttClient.on("error", mqttCallbacks.onError);
  mqttClient.on("message", mqttCallbacks.onMessage);

  return mqttClient;
}

export const mqttClient = createMqttClient();
