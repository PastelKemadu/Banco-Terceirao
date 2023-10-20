import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../error/AppError";

export default function verifyRefreshToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const refreshToken = request.body.refreshToken;

    if (!refreshToken) {
      throw new AppError("JWT token não informado", 401);
    }

    const token = refreshToken;
    const decodeToken = verify(token, authConfig.jwtRefresh.secret);
    request.body.refreshToken = decodeToken;
    return next();
  } catch (err) {
    response.status(401).json(new AppError("Token inválido"));
  }
}
