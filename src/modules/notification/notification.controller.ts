import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import { NotificationServices } from "./notification.service";

const getMyNotifications = asyncHandler(async (req: Request, res: Response) => {
  const result = await NotificationServices.getMyNotifications(req.user.userId);

  res.status(200).json({
    success: true,

    message: "Notifications retrieved successfully",

    data: result,
  });
});

const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const result = await NotificationServices.markAsRead(
    req.params.notificationId as string
  );

  res.status(200).json({
    success: true,

    message: "Notification marked as read",

    data: result,
  });
});

const markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
  await NotificationServices.markAllAsRead(req.user.userId);

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
});

const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
  const result = await NotificationServices.getUnreadCount(req.user.userId);

  res.status(200).json({
    success: true,
    message: "Unread notification count retrieved successfully",
    data: result,
  });
});

export const NotificationControllers = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
};
