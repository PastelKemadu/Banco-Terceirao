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
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.users.findMany();
        });
    }
    debitarConta(valor, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.users.findUnique({ where: { id } });
            if (user) {
                yield prisma.users.update({
                    where: { id: id },
                    data: { dinheiro: Number(valor) },
                });
            }
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.products.findMany();
        });
    }
    getProductByChave(chave) {
        return __awaiter(this, void 0, void 0, function* () {
            const produto = prisma.products.findUnique({ where: { chave } });
            return produto;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = prisma.users.findUnique({ where: { email } });
            return usuario;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = prisma.users.findUnique({ where: { id } });
            return usuario;
        });
    }
    createProduct(nome, preco, chave) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.products.create({
                data: {
                    nome: nome,
                    preco: preco,
                    chave: chave,
                },
            });
        });
    }
    createUser(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email, senha);
            const hashedSenha = yield (0, bcryptjs_1.hash)(senha, 8);
            yield prisma.users.create({
                data: {
                    email: email,
                    senha: hashedSenha,
                    dinheiro: 100,
                },
            });
        });
    }
}
exports.default = UserService;
