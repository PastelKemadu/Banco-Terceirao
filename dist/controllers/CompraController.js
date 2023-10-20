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
const compra_service_1 = __importDefault(require("../services/compra.service"));
const AppError_1 = __importDefault(require("../error/AppError"));
const compraService = new compra_service_1.default();
class CompraController {
    createCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioId = req.body.usuarioId;
            const produtoId = req.body.produtoId;
            try {
                yield compraService.createCompra(usuarioId, produtoId).then(() => {
                    res.json("Compra registrada com sucesso!");
                });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    updateConta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioId = req.body.usuarioId;
            const valor = req.body.valor;
            try {
                yield compraService
                    .refreshMoneyAccount(usuarioId, valor)
                    .then((msg) => {
                    if (msg == null) {
                        throw new AppError_1.default("Não foi encontrado um usuário", 404);
                    }
                    res.json(msg);
                })
                    .catch((err) => {
                    res.status(err.status).json({ msg: err.message });
                });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getComprasByUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioId = req.params.usuarioId;
            try {
                yield compraService
                    .getComprasByUsuario(usuarioId)
                    .then((compras) => {
                    if (compras == undefined) {
                        throw new AppError_1.default("Nenhuma compra até o momento", 404);
                    }
                    res.json(compras);
                })
                    .catch((err) => {
                    res.status(err.status).json({ msg: err.message });
                });
            }
            catch (err) {
                res.json(err);
            }
        });
    }
}
exports.default = CompraController;
