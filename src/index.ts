import * as dotenv from "dotenv";
import { appMqttClient } from "./config/mqtt";
import server from "./server";

// Loading the environment variables
dotenv.config();

// Setting up the MQTT client
appMqttClient.setUpCallbacks();
appMqttClient.setUpTopicsSubscription();

// Turning on the server
const port = process.env.PORT || 3333;
server.listen(port, () => console.log("Server is running!"));
