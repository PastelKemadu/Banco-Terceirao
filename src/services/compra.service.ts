import { PrismaClient } from "@prisma/client";
import { User } from "../model/User";
import { hash } from "bcryptjs";
import { Product } from "../model/Product";
const prisma = new PrismaClient();

class CompraService {
  async createCompra(usuarioId: string, produtoId: string): Promise<void> {
    await prisma.compra.create({
      data: {
        usuarioId: usuarioId,
        produtoId: produtoId,
      },
    });
  }

  async getComprasByUsuario(usuarioId: string): Promise<any> {
    const usuario = await prisma.users.findUnique({
      where: { id: usuarioId },
      include: {
        compras: {
          include: {
            product: true,
          },
        },
      },
    });

    return usuario?.compras;
  }

  async refreshMoneyAccount(usuarioId: string, valor: string): Promise<any> {
    const usuario = await prisma.users.findUnique({ where: { id: usuarioId } });
    if (usuario) {
      const updatedUsuario = await prisma.users.update({
        where: { id: usuarioId },
        data: { dinheiro: Number(valor) },
      });

      return updatedUsuario;
    }
    return null;
  }
}

export default CompraService;
