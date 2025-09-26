import express from "express";
import cors from "cors";
import helmet from "helmet";

import routerV1 from "./routes/v1/router";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routerV1);

export default app;
