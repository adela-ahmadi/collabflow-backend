import { Router } from "express";

import auth from "../../middlewares/auth";

import validateRequest from "../../middlewares/validateRequest";

import { TaskControllers } from "./task.controller";

import { createTaskValidationSchema } from "./task.validation";

const router = Router();

router.post(
  "/create",

  auth("USER", "ADMIN"),

  validateRequest(createTaskValidationSchema),

  TaskControllers.createTask
);

export default router;
