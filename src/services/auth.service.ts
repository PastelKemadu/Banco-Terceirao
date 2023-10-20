import { User } from "../model/User";
import { compare, hash } from "bcryptjs";
import UserService from "./user.service";
import authConfig from "../config/auth";
import { sign, verify } from "jsonwebtoken";
import AppError from "../error/AppError";
const userService = new UserService();

interface loginRequest {
  email: string;
  senha: string;
}

class AuthService {
  async login({ email, senha }: loginRequest): Promise<any> {
    console.log(email, senha);
    const user = await userService.getUserByEmail(email);

    if (user == null) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const liberarUsuario = compare(senha, user.senha);
    if ((await liberarUsuario) == true) {
      const token = sign({}, authConfig.jwt.secret, {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      });
      const refreshToken = sign({}, authConfig.jwtRefresh.secret, {
        subject: user.id,
        expiresIn: authConfig.jwtRefresh.expiresIn,
      });
      return { token: token, refreshToken: refreshToken, id: user.id };
    }

    throw new AppError("Credenciais inválidas");
  }

  async generateRefreshToken(user: any) {
    const token = sign({}, authConfig.jwt.secret, {
      subject: user,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return token;
  }
}

export default AuthService;
