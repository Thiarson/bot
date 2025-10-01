import { Router } from "express";

import { validateToken } from "@middlewares/auth.middleware";
import { upload } from "@middlewares/upload.middleware";
import agentController from "./agent.controller";

const agentRouter = Router();

agentRouter.post(
    "/parse-cv", 
    validateToken,
    upload.single("file"), 
    agentController.parseCV
);

export default agentRouter;
