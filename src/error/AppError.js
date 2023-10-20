"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    constructor(message, status = 404, time = new Date()) {
        this.status = status;
        this.message = message;
        this.time = time;
    }
}
exports.default = AppError;
