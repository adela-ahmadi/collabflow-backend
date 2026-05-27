import { Router } from "express";

import auth from "../../middlewares/auth";

import { ActivityControllers } from "./activity.controller";

const router = Router();

router.get(
  "/workspace/:workspaceId",

  auth("USER", "ADMIN"),

  ActivityControllers.getWorkspaceActivities
);

export default router;
