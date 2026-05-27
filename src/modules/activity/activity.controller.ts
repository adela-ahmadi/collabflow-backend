import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import { ActivityServices } from "./activity.service";

const getWorkspaceActivities = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ActivityServices.getWorkspaceActivities(
      req.params.workspaceId as string
    );

    res.status(200).json({
      success: true,

      message: "Activities retrieved successfully",

      data: result,
    });
  }
);

export const ActivityControllers = {
  getWorkspaceActivities,
};
