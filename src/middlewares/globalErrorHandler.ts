import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = error.statusCode || 500;

  let message = error.message || "Something went wrong";

  let errorSources: {
    path: string;
    message: string;
  }[] = [];

  if (error.name === "JsonWebTokenError") {
    statusCode = 401;

    message = "Invalid token";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;

    message = "Token expired";
  }

  if (error instanceof ZodError) {
    statusCode = 400;

    message = "Validation Error";

    errorSources = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  if (error.name === "CastError") {
    statusCode = 400;

    message = "Invalid MongoDB ObjectId";
  }

  if (error.code === 11000) {
    statusCode = 400;

    const field = Object.keys(error.keyValue)[0];

    message = `${field} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    message,

    error: {
      statusCode,
      name: error.name,
    },

    errorSources,
  });
};

export default globalErrorHandler;
