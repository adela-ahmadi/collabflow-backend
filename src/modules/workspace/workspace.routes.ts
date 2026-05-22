import { Router } from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { WorkspaceControllers } from "./workspace.controller";

import {
  createWorkspaceValidationSchema,
  inviteMemberValidationSchema,
} from "./workspace.validation";

const router = Router();

router.post(
  "/create",
  auth("USER", "ADMIN"),

  validateRequest(createWorkspaceValidationSchema),

  WorkspaceControllers.createWorkspace
);

router.get(
  "/my-workspaces",

  auth("USER", "ADMIN"),

  WorkspaceControllers.getMyWorkspaces
);

router.patch(
  "/:workspaceId/invite",

  auth("USER", "ADMIN"),

  validateRequest(inviteMemberValidationSchema),

  WorkspaceControllers.inviteMember
);

export default router;
