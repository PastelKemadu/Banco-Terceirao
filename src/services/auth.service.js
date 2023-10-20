"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const user_service_1 = __importDefault(require("./user.service"));
const auth_1 = __importDefault(require("../config/auth"));
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../error/AppError"));
const userService = new user_service_1.default();
class AuthService {
    login({ email, senha }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email, senha);
            const user = yield userService.getUserByEmail(email);
            if (user == null) {
                throw new AppError_1.default("Usuário não encontrado", 401);
            }
            const liberarUsuario = (0, bcryptjs_1.compare)(senha, user.senha);
            if ((yield liberarUsuario) == true) {
                const token = (0, jsonwebtoken_1.sign)({}, auth_1.default.jwt.secret, {
                    subject: user.id,
                    expiresIn: auth_1.default.jwt.expiresIn,
                });
                const refreshToken = (0, jsonwebtoken_1.sign)({}, auth_1.default.jwtRefresh.secret, {
                    subject: user.id,
                    expiresIn: auth_1.default.jwtRefresh.expiresIn,
                });
                return { token: token, refreshToken: refreshToken, id: user.id };
            }
            throw new AppError_1.default("Credenciais inválidas");
        });
    }
    generateRefreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, jsonwebtoken_1.sign)({}, auth_1.default.jwt.secret, {
                subject: user,
                expiresIn: auth_1.default.jwt.expiresIn,
            });
            return token;
        });
    }
}
exports.default = AuthService;
