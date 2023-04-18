const onConnect = () => {
  console.log("Connected to MQTT broker");
};

const onError = (error: Error) => {
  console.log("Error connecting to MQTT broker", error);
};

const onMessage = (topic: string, message: Buffer) => {
  console.log(`Received message on topic ${topic}: ${message}`);
};

export { onConnect, onError, onMessage };
