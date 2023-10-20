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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const authService = new auth_service_1.default();
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield authService
                    .login({ email: req.body.email, senha: req.body.senha })
                    .then((resAuth) => {
                    console.log(resAuth);
                    res.json(resAuth);
                });
            }
            catch (err) {
                res.status(err.status).json(err);
            }
        });
    }
    getRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.refreshToken;
                yield authService.generateRefreshToken(user.sub).then((token) => {
                    res.json({ token: token, id: user.sub });
                });
            }
            catch (err) {
                res.status(err.status).json(err);
            }
        });
    }
}
exports.default = AuthController;
