import { Router } from "express";

import auth from "../../middlewares/auth";

import validateRequest from "../../middlewares/validateRequest";

import { TaskControllers } from "./task.controller";

import {
  createTaskValidationSchema,
  updateTaskStatusValidationSchema,
  assignTaskValidationSchema,
  updateTaskValidationSchema,
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

router.patch(
  "/:taskId",

  auth("USER", "ADMIN"),

  validateRequest(updateTaskValidationSchema),

  TaskControllers.updateTask
);

router.delete(
  "/:taskId",

  auth("USER", "ADMIN"),

  TaskControllers.deleteTask
);

export default router;
