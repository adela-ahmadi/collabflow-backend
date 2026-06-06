import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import AppError from "../errors/AppError";
import config from "../config";

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new AppError(401, "You are not authorized");
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      req.user = decoded;

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new AppError(403, "Forbidden access");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
