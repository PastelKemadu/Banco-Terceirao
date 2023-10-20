"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const AppError_1 = __importDefault(require("../error/AppError"));
function verifyRefreshToken(request, response, next) {
    try {
        const refreshToken = request.body.refreshToken;
        if (!refreshToken) {
            throw new AppError_1.default("JWT token não informado", 401);
        }
        const token = refreshToken;
        const decodeToken = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwtRefresh.secret);
        request.body.refreshToken = decodeToken;
        return next();
    }
    catch (err) {
        response.status(401).json(new AppError_1.default("Token inválido"));
    }
}
exports.default = verifyRefreshToken;
