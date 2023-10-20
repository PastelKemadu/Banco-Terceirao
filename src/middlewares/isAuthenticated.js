"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const AppError_1 = __importDefault(require("../error/AppError"));
function isAuthenticated(request, response, next) {
    try {
        const authHeader = request.headers.authorization;
        console.log(authHeader);
        if (!authHeader) {
            throw new AppError_1.default("JWT token não informado", 401);
        }
        const [, token] = authHeader.split(" ");
        const decodeToken = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        return next();
    }
    catch (_a) {
        response.status(500).json({ message: "Token inválido" });
    }
}
exports.default = isAuthenticated;
