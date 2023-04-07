import * as dotenv from "dotenv";
import { AppMqttClient } from "./config/mqtt";
import server from "./server";

// Loading the environment variables
dotenv.config();

// Connecting to the MQTT broker
const client = new AppMqttClient();
client.setUpCallbacks();
client.setUpTopicsSubscription();

// Turning on the server
const port = process.env.PORT || 3333;
server.listen(port, () => console.log("Server is running!"));
