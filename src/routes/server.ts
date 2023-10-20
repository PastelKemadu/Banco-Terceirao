import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";
import isAuthenticated from "../middlewares/isAuthenticated";
import AppError from "../error/AppError";
import verifyRefreshToken from "../middlewares/verifyRefreshToken";
import axios from "axios";
import CompraController from "../controllers/CompraController";

const app = express();
const userController = new UserController();
const authController = new AuthController();
const compraController = new CompraController();

app.use(express.json());
app.use(cors());
app.use(
  (
    error: AppError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.status).json({
        status: error.status,
        message: error.message,
        time: error.time,
      });
    }
  }
);

app.post("/users", userController.createUser);
app.get("/users", isAuthenticated, userController.getUsers);
app.get("/users/:email", userController.getUserByEmail.bind(userController));
app.get("/user/:id", userController.getUserById.bind(userController));
app.post("/login", authController.login);
app.post("/refresh", verifyRefreshToken, authController.getRefreshToken);
app.get("/products", userController.getProducts);
app.post("/products", userController.createProduct);
app.get(
  "/product/:chave",
  userController.getProductByChave.bind(userController)
);
app.post("/compra", compraController.createCompra);
app.get(
  "/compras/:usuarioId",
  compraController.getComprasByUsuario.bind(compraController)
);
app.post("/compras", compraController.updateConta);

app.listen(3333);
