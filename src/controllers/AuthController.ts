import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import AppError from "../error/AppError";

const authService = new AuthService();

export default class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      await authService
        .login({ email: req.body.email, senha: req.body.senha })
        .then((resAuth) => {
          console.log(resAuth);
          res.json(resAuth);
        });
    } catch (err: any) {
      res.status(err.status).json(err);
    }
  }

  async getRefreshToken(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body.refreshToken;
      await authService.generateRefreshToken(user.sub).then((token: string) => {
        res.json({ token: token, id: user.sub });
      });
    } catch (err: any) {
      res.status(err.status).json(err);
    }
  }
}
