import { Router } from "express";

import auth from "../../middlewares/auth";

import validateRequest from "../../middlewares/validateRequest";

import { TaskControllers } from "./task.controller";

import {
  createTaskValidationSchema,
  updateTaskStatusValidationSchema,
  assignTaskValidationSchema,
} from "./task.validation";

const router = Router();

router.post(
  "/create",

  auth("USER", "ADMIN"),

  validateRequest(createTaskValidationSchema),

  TaskControllers.createTask
);
router.get(
  "/workspace/:workspaceId",

  auth("USER", "ADMIN"),

  TaskControllers.getWorkspaceTasks
);

router.patch(
  "/:taskId/status",

  auth("USER", "ADMIN"),

  validateRequest(updateTaskStatusValidationSchema),

  TaskControllers.updateTaskStatus
);

router.patch(
  "/:taskId/assign",

  auth("USER", "ADMIN"),

  validateRequest(assignTaskValidationSchema),

  TaskControllers.assignTask
);

export default router;
