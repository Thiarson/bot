import { Router } from "express";

import { validateServiceKey, validateToken } from "@middlewares/auth.middleware";
import cvController from "@controllers/cv.controller";

const cvRouter = Router();

// cvRouter.post(
//     "/extract", 
//     validateToken,
//     upload.single("file"), 
//     cvController.parseCV,
// );

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

cvRouter.post(
    "/presigned-url",
    validateToken,
    cvController.generateSignedUrl,
);

cvRouter.post(
    "/file-metadata",
    validateToken,
    cvController.sendFileToExtractQueue,
);

cvRouter.post(
    "/extract-result",
    validateServiceKey,
    cvController.saveExtractedCv,
);

export default cvRouter;
