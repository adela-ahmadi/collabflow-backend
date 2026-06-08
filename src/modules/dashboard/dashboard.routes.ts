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

export default router;
