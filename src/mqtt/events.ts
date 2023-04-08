/**
 * Handle connection to MQTT broker
 */
function onConnect() {
  console.log("Connected to MQTT broker");
}

/**
 * Handle error received from MQTT broker
 * @param error Error object
 */
function onError(error: Error) {
  console.log("Error connecting to MQTT broker", error);
}

/**
 * Handle message received from MQTT broker
 * @param topic Topic where the message was received
 * @param message Message received
 */
function onMessage(topic: string, message: Buffer) {
  console.log(`Received message on topic ${topic}: ${message}`);
}

export { onConnect, onError, onMessage };
