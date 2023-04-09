import * as dotenv from "dotenv";
import { appMqttClient } from "./mqtt/client";
import { onConnect, onError, onMessage } from "./mqtt/events";
import server from "./server";

// Loading the environment variables
dotenv.config();

// Setting up the MQTT client
appMqttClient.setUpTopicsSubscription();
appMqttClient.on("connect", onConnect);
appMqttClient.on("error", onError);
appMqttClient.on("message", onMessage);

// Turning on the server
const port = process.env.PORT || 3333;
server.listen(port, () => console.log("Server is running!"));
