import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../error/AppError";

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const authHeader = request.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
      throw new AppError("JWT token não informado", 401);
    }

    const [, token] = authHeader.split(" ");

    const decodeToken = verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    response.status(500).json({ message: "Token inválido" });
  }
}
