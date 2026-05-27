import { Router } from "express";

import auth from "../../middlewares/auth";

import { NotificationControllers } from "./notification.controller";

const router = Router();

router.get(
  "/my-notifications",

  auth("USER", "ADMIN"),

  NotificationControllers.getMyNotifications
);

router.patch(
  "/:notificationId/read",

  auth("USER", "ADMIN"),

  NotificationControllers.markAsRead
);

export default router;
