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

router.patch(
  "/read-all",

  auth("USER", "ADMIN"),

  NotificationControllers.markAllAsRead
);

router.get(
  "/unread-count",

  auth("USER", "ADMIN"),

  NotificationControllers.getUnreadCount
);

export default router;
