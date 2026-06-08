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
export const DashboardControllers = {
  getDashboardStats,
  getTaskStatusStats,
};
