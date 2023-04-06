import * as dotenv from "dotenv";
import server from "./server";

// Loading the environment variables
dotenv.config();

// Turning on the server
const port = process.env.PORT || 3333;
server.listen(port, () => console.log("Server is running!"));
