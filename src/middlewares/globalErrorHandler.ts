import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  const message = error.message || "Something went wrong";

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
