import { Prisma } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  senha: string;
  dinheiro: number;
}
