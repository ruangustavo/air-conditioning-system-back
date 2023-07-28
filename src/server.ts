import * as dotenv from "dotenv";
import { mqttClient } from "./mqtt/client";
import { onConnect, onError, onMessage } from "./mqtt/events";
import server from "./app";

// Loading the environment variables
dotenv.config();

// Setting up the MQTT client
mqttClient.on("connect", onConnect);
mqttClient.on("error", onError);
mqttClient.on("message", onMessage);

// Turning on the server
const port = process.env.PORT || 3333;
server.listen(port, () => console.log("Server is running!"));
