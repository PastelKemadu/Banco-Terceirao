"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const AppError_1 = __importDefault(require("../error/AppError"));
const verifyRefreshToken_1 = __importDefault(require("../middlewares/verifyRefreshToken"));
const CompraController_1 = __importDefault(require("../controllers/CompraController"));
const app = (0, express_1.default)();
const userController = new UserController_1.default();
const authController = new AuthController_1.default();
const compraController = new CompraController_1.default();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.default) {
        return response.status(error.status).json({
            status: error.status,
            message: error.message,
            time: error.time,
        });
    }
});
app.post("/users", userController.createUser);
app.get("/users", isAuthenticated_1.default, userController.getUsers);
app.get("/users/:email", userController.getUserByEmail.bind(userController));
app.get("/user/:id", userController.getUserById.bind(userController));
app.post("/login", authController.login);
app.post("/refresh", verifyRefreshToken_1.default, authController.getRefreshToken);
app.get("/products", userController.getProducts);
app.post("/products", userController.createProduct);
app.get("/product/:chave", userController.getProductByChave.bind(userController));
app.post("/compra", compraController.createCompra);
app.get("/compras/:usuarioId", compraController.getComprasByUsuario.bind(compraController));
app.post("/compras", compraController.updateConta);
app.listen(3333);
