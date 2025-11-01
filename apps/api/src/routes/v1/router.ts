import { Router } from "express";

import authRouter from "./auth/auth.route";
import cvRouter from "./cv/cv.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/cv", cvRouter);

export default router;
