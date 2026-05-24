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

const getMyWorkspaces = asyncHandler(async (req: Request, res: Response) => {
  const result = await WorkspaceServices.getMyWorkspaces(req.user.userId);

  res.status(200).json({
    success: true,
    message: "Workspaces retrieved successfully",
    data: result,
  });
});

const inviteMember = asyncHandler(async (req: Request, res: Response) => {
  const result = await WorkspaceServices.inviteMember(
    req.params.workspaceId as string,

    req.body,

    req.user.userId
  );

  res.status(200).json({
    success: true,
    message: "Member invited successfully",

    data: result,
  });
});

const promoteMemberToAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await WorkspaceServices.promoteMemberToAdmin(
      req.params.workspaceId as string,

      req.body.userId,

      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Member promoted to admin successfully",

      data: result,
    });
  }
);

export const WorkspaceControllers = {
  createWorkspace,
  getMyWorkspaces,
  inviteMember,
  promoteMemberToAdmin,
};
