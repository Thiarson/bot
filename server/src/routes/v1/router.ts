import { Router } from "express";

import testRouter from "./test/test.route";
import authRouter from "./auth/auth.route";
import agentRouter from "./agent/agent.route";

const router = Router();

router.use("/", testRouter);
router.use("/auth", authRouter);
router.use("/agent", agentRouter);

export default router;
