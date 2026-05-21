import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AuthServices } from "./auth.service";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  const result = await AuthServices.refreshToken(token as string);

  res.status(200).json({
    success: true,
    message: "Access token retrieved successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
};
