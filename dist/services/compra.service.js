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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CompraService {
    createCompra(usuarioId, produtoId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.compra.create({
                data: {
                    usuarioId: usuarioId,
                    produtoId: produtoId,
                },
            });
        });
    }
    getComprasByUsuario(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield prisma.users.findUnique({
                where: { id: usuarioId },
                include: {
                    compras: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
            return usuario === null || usuario === void 0 ? void 0 : usuario.compras;
        });
    }
    refreshMoneyAccount(usuarioId, valor) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield prisma.users.findUnique({ where: { id: usuarioId } });
            if (usuario) {
                const updatedUsuario = yield prisma.users.update({
                    where: { id: usuarioId },
                    data: { dinheiro: Number(valor) },
                });
                return updatedUsuario;
            }
            return null;
        });
    }
}
exports.default = CompraService;
