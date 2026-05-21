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

export const UserControllers = {
  getMe,
};
