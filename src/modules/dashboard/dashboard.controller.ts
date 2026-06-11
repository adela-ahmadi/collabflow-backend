import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import asyncHandler from "../../utils/asyncHandler";

import { DashboardServices } from "./dashboard.service";

const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await DashboardServices.getDashboardStats(user.userId);

  res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: result,
  });
});

const getTaskStatusStats = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await DashboardServices.getTaskStatusStats(user.userId);

  res.status(200).json({
    success: true,
    message: "Task status stats retrieved successfully",
    data: result,
  });
});

const getRecentActivities = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await DashboardServices.getRecentActivities(user.userId);

    res.status(200).json({
      success: true,
      message: "Recent activities retrieved successfully",
      data: result,
    });
  }
);

const getWorkspaceActivities = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await DashboardServices.getWorkspaceActivities(
      req.params.workspaceId as string,
      user.userId
    );

    res.status(200).json({
      success: true,
      message: "Workspace activities retrieved successfully",
      data: result,
    });
  }
);

const getCompletionRate = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await DashboardServices.getCompletionRate(user.userId);

  res.status(200).json({
    success: true,
    message: "Completion rate retrieved successfully",
    data: result,
  });
});

const getWorkspaceOverview = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;

    const result = await DashboardServices.getWorkspaceOverview(
      req.params.workspaceId as string,
      user.userId
    );

    res.status(200).json({
      success: true,
      message: "Workspace overview retrieved successfully",
      data: result,
    });
  }
);

export const DashboardControllers = {
  getDashboardStats,
  getTaskStatusStats,
  getRecentActivities,
  getWorkspaceActivities,
  getCompletionRate,
  getWorkspaceOverview,
};
