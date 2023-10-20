import { PrismaClient } from "@prisma/client";
import { User } from "../model/User";
import { hash } from "bcryptjs";
import { Product } from "../model/Product";
const prisma = new PrismaClient();

class UserService {
  async getAllUsers(): Promise<User[]> {
    return prisma.users.findMany();
  }

  async debitarConta(valor: string, id: string): Promise<void> {
    const user = await prisma.users.findUnique({ where: { id } });
    if (user) {
      await prisma.users.update({
        where: { id: id },
        data: { dinheiro: Number(valor) },
      });
    }
  }

  async getAllProducts(): Promise<Product[]> {
    return prisma.products.findMany();
  }

  async getProductByChave(chave: string): Promise<Product | null> {
    const produto = prisma.products.findUnique({ where: { chave } });
    return produto;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const usuario = prisma.users.findUnique({ where: { email } });
    return usuario;
  }

  async getUserById(id: string): Promise<User | null> {
    const usuario = prisma.users.findUnique({ where: { id } });
    return usuario;
  }

  async createProduct(
    nome: string,
    preco: number,
    chave: string
  ): Promise<void> {
    await prisma.products.create({
      data: {
        nome: nome,
        preco: preco,
        chave: chave,
      },
    });
  }

  async createUser(email: string, senha: string): Promise<void> {
    console.log(email, senha);
    const hashedSenha = await hash(senha, 8);
    await prisma.users.create({
      data: {
        email: email,
        senha: hashedSenha,
        dinheiro: 100,
      },
    });
  }
}

export default UserService;
