import express from "express";
import morgan from "morgan";
import airConditionerManagementRouter from "./routes/air-conditioner-routes";
import cors from "cors";

const app = express();

// Setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// Setting up routes
app.use("/", airConditionerManagementRouter);

export default app;
