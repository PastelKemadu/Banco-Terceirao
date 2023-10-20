import { ErrorRequestHandler, Request, Response } from "express";
import { User } from "../model/User";
import UserService from "../services/user.service";
import AppError from "../error/AppError";
import axios from "axios";

const userService = new UserService();

export default class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      await userService.getAllUsers().then((users) => {
        res.json(users);
      });
    } catch (error: any) {
      res.json(error);
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      userService.getUserByEmail(email).then((user) => {
        if (user == null) {
          throw new AppError("Usuário não encontrado");
        } else res.json(user);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      userService.getUserById(id).then((user) => {
        if (user == null) {
          throw new AppError("Usuário não encontrado");
        } else res.json(user);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductByChave(req: Request, res: Response): Promise<void> {
    try {
      const chave = req.params.chave;
      userService
        .getProductByChave(chave)
        .then((product) => {
          if (product == null) {
            throw new AppError("Chave do produto inválida", 404);
          }
          res.json(product);
        })
        .catch((err) => {
          res.status(err.status).json({ msg: err.message });
        });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      userService.getAllProducts().then((produtos) => {
        if (produtos == null) {
          throw new AppError("Nenhum produto listado");
        } else res.json(produtos);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    console.log(req);
    try {
      const nome = req.body.nome;
      const preco = req.body.preco;
      const chave = req.body.chave;
      await userService
        .createProduct(nome, preco, chave)
        .then(() => {
          res.json({ msg: "Produto registrado com sucesso!" });
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "P2002") {
            throw new AppError("Usuário já cadastrado no sistema");
          }
        });
    } catch (error) {
      res.json(error);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    console.log(req);
    try {
      const email = req.body.email;
      const senha = req.body.senha;
      await userService
        .createUser(email, senha)
        .then(() => {
          res.json({ msg: "Usuário registrado com sucesso!" });
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "P2002") {
            throw new AppError("Usuário já cadastrado no sistema");
          }
        });
    } catch (error) {
      res.json(error);
    }
  }
}
