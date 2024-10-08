import express from "express";
import * as toolsController from "../controllers/tools.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.get("/tags", toolsController.getTags);

router.get("/approved/:tagName", toolsController.getApprovedToolsByTagName);
router.get("/:status", toolsController.getToolsByStatus);

router.put(
  "/update-status/:id",
  tokenMiddleware.auth,
  toolsController.updateToolStatus
);

router.post("/", toolsController.addTool);

export default router;
