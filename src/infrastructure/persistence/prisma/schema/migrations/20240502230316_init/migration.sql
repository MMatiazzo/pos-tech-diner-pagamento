-- CreateTable
CREATE TABLE "pagamento" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pagamento_pedidoId_key" ON "pagamento"("pedidoId");
