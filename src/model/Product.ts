import { Prisma } from "@prisma/client";

export interface Product {
  id: string;
  nome: string;
  chave: string;
  preco: number;
}
