import { Router } from "express";

import { validateToken } from "@middlewares/auth.middleware";

const testRouter = Router();

testRouter.post(
    "/test",
    validateToken,
    (req, res) => { console.log("test", req.user) }
);

export default testRouter;
