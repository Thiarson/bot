import { Router } from "express";

import testRouter from "./test/test.route";
import authRouter from "./auth/auth.route";

const router = Router();

router.use("/", testRouter);
router.use("/auth", authRouter);

export default router;
