import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = error.statusCode || 500;

  let message = error.message || "Something went wrong";

  if (error.name === "JsonWebTokenError") {
    statusCode = 401;

    message = "Invalid token";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;

    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,

    error: {
      statusCode,
      name: error.name,
    },
  });
};

export default globalErrorHandler;
