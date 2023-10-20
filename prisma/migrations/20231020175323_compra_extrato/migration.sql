-- CreateTable
CREATE TABLE "compra" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
