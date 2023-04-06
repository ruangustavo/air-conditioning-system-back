import express from "express";
import morgan from "morgan";
import roomRouter from "./router/roomRoutes";
import airConditionerManagementRouter from "./router/airConditionerManagementRoutes";

const app = express();

// Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Setting up routes
app.use("/", roomRouter);
app.use("/", airConditionerManagementRouter);

// Turning on the server
const port = process.env.PORT || 3333;
app.listen(port, () => console.log("Server is running!"));
