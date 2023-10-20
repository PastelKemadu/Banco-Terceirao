/*
  Warnings:

  - A unique constraint covering the columns `[chave]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chave` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "chave" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_chave_key" ON "products"("chave");
