import { Router } from "express";

import { validateToken } from "@middlewares/auth.middleware";
import { upload } from "@middlewares/upload.middleware";
import cvController from "@controllers/cv.controller";

const cvRouter = Router();

cvRouter.post(
    "/extract", 
    validateToken,
    upload.single("file"), 
    cvController.parseCV,
);

cvRouter.get(
    "/saved",
    validateToken,
    cvController.saved,
);

cvRouter.post(
    "/save",
    validateToken,
    cvController.saveCV,
);

cvRouter.post(
    "/export",
    validateToken,
    cvController.exportCV,
);

export default cvRouter;
