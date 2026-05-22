import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import { WorkspaceServices } from "./workspace.service";

const createWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const result = await WorkspaceServices.createWorkspace(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Workspace created successfully",
    data: result,
  });
});

export const WorkspaceControllers = {
  createWorkspace,
};
