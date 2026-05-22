import { Router } from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { WorkspaceControllers } from "./workspace.controller";

import { createWorkspaceValidationSchema } from "./workspace.validation";

const router = Router();

router.post(
  "/create",
  auth("USER", "ADMIN"),

  validateRequest(createWorkspaceValidationSchema),

  WorkspaceControllers.createWorkspace
);

export default router;
