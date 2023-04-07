import express from "express";
import morgan from "morgan";
import roomRouter from "./routers/roomRoutes";
import airConditionerManagementRouter from "./routers/acManagementRoutes";

const app = express();

// Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Setting up routes
app.use("/", roomRouter);
app.use("/", airConditionerManagementRouter);

export default app;
