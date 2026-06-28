import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import { UserServices } from "./user.service";

const getMe = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserServices.getMe(req.user.userId);

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const uploadAvatar = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new Error("No file uploaded");
  }

  const result = await UserServices.uploadAvatar(
    req.user.userId,
    req.file.path
  );

  res.status(200).json({
    success: true,
    message: "Avatar uploaded successfully",
    data: result,
  });
});

export const UserControllers = {
  getMe,
  uploadAvatar,
};
