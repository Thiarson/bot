import { Router } from "express";

import authRouter from "./auth.route";
import cvRouter from "./cv.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/cv", cvRouter);

export default router;
