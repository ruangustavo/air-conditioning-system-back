import express from "express";
import morgan from "morgan";
import roomRouter from "./routes/room-routes";
import airConditionerManagementRouter from "./routes/air-conditioner-routes";

const app = express();

// Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Setting up routes
app.use("/", roomRouter);
app.use("/", airConditionerManagementRouter);

export default app;
