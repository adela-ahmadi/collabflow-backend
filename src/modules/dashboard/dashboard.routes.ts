import { Router } from "express";

import auth from "../../middlewares/auth";

import { DashboardControllers } from "./dashboard.controller";

const router = Router();

router.get(
  "/stats",
  auth("USER", "ADMIN"),
  DashboardControllers.getDashboardStats
);
router.get(
  "/task-status-stats",
  auth("USER", "ADMIN"),
  DashboardControllers.getTaskStatusStats
);

router.get(
  "/recent-activities",
  auth("USER", "ADMIN"),
  DashboardControllers.getRecentActivities
);

router.get(
  "/workspace-activities/:workspaceId",
  auth("USER", "ADMIN"),
  DashboardControllers.getWorkspaceActivities
);

router.get(
  "/completion-rate",
  auth("USER", "ADMIN"),
  DashboardControllers.getCompletionRate
);

router.get(
  "/workspace-overview/:workspaceId",
  auth("USER", "ADMIN"),
  DashboardControllers.getWorkspaceOverview
);

export default router;
