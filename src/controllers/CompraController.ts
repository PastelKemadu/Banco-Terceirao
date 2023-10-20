import { Request, Response } from "express";
import CompraService from "../services/compra.service";
import AppError from "../error/AppError";

const compraService = new CompraService();

export default class CompraController {
  async createCompra(req: Request, res: Response): Promise<void> {
    const usuarioId = req.body.usuarioId;
    const produtoId = req.body.produtoId;
    try {
      await compraService.createCompra(usuarioId, produtoId).then(() => {
        res.json("Compra registrada com sucesso!");
      });
    } catch (error: any) {
      res.json(error);
    }
  }

  async updateConta(req: Request, res: Response): Promise<void> {
    const usuarioId = req.body.usuarioId;
    const valor = req.body.valor;
    try {
      await compraService
        .refreshMoneyAccount(usuarioId, valor)
        .then((msg) => {
          if (msg == null) {
            throw new AppError("Não foi encontrado um usuário", 404);
          }
          res.json(msg);
        })
        .catch((err) => {
          res.status(err.status).json({ msg: err.message });
        });
    } catch (error: any) {
      res.json(error);
    }
  }

  async getComprasByUsuario(req: Request, res: Response): Promise<void> {
    const usuarioId = req.params.usuarioId;
    try {
      await compraService
        .getComprasByUsuario(usuarioId)
        .then((compras) => {
          if (compras == undefined) {
            throw new AppError("Nenhuma compra até o momento", 404);
          }
          res.json(compras);
        })
        .catch((err) => {
          res.status(err.status).json({ msg: err.message });
        });
    } catch (err) {
      res.json(err);
    }
  }
}
