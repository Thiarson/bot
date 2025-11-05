import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { frontendUrl } from "@config/api.config";

import routerV1 from "./routes/v1/router";

const app = express();

app.use(cors({
    origin: frontendUrl,
    credentials: true,
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/v1", routerV1);

export default app;
