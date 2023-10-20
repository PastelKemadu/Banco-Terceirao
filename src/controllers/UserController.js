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
const user_service_1 = __importDefault(require("../services/user.service"));
const AppError_1 = __importDefault(require("../error/AppError"));
const userService = new user_service_1.default();
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userService.getAllUsers().then((users) => {
                    res.json(users);
                });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.email;
                userService.getUserByEmail(email).then((user) => {
                    if (user == null) {
                        throw new AppError_1.default("Usuário não encontrado");
                    }
                    else
                        res.json(user);
                });
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                userService.getUserById(id).then((user) => {
                    if (user == null) {
                        throw new AppError_1.default("Usuário não encontrado");
                    }
                    else
                        res.json(user);
                });
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    getProductByChave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chave = req.params.chave;
                userService
                    .getProductByChave(chave)
                    .then((product) => {
                    if (product == null) {
                        throw new AppError_1.default("Chave do produto inválida", 404);
                    }
                    res.json(product);
                })
                    .catch((err) => {
                    res.status(err.status).json({ msg: err.message });
                });
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userService.getAllProducts().then((produtos) => {
                    if (produtos == null) {
                        throw new AppError_1.default("Nenhum produto listado");
                    }
                    else
                        res.json(produtos);
                });
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            try {
                const nome = req.body.nome;
                const preco = req.body.preco;
                const chave = req.body.chave;
                yield userService
                    .createProduct(nome, preco, chave)
                    .then(() => {
                    res.json({ msg: "Produto registrado com sucesso!" });
                })
                    .catch((error) => {
                    console.log(error);
                    if (error.code == "P2002") {
                        throw new AppError_1.default("Usuário já cadastrado no sistema");
                    }
                });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            try {
                const email = req.body.email;
                const senha = req.body.senha;
                yield userService
                    .createUser(email, senha)
                    .then(() => {
                    res.json({ msg: "Usuário registrado com sucesso!" });
                })
                    .catch((error) => {
                    console.log(error);
                    if (error.code == "P2002") {
                        throw new AppError_1.default("Usuário já cadastrado no sistema");
                    }
                });
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.default = UserController;
