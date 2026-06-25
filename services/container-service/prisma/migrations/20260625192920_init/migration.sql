-- CreateEnum
CREATE TYPE "STATUS_CONTAINER" AS ENUM ('CHEGOU', 'DOCUMENTACAO_PENDENTE', 'DOCUMENTACAO_CRIADA', 'INSPECAO_SOLICITADA', 'INSPECAO_APROVADA', 'INSPECAO_REPROVADA', 'ALFANDEGA_LIBERADA', 'BLOQUEADO', 'ARMAZENADO_NO_PATIO', 'LIBERADO');

-- CreateTable
CREATE TABLE "containers" (
    "id" TEXT NOT NULL,
    "ship_id" TEXT NOT NULL,
    "terminal_id" TEXT NOT NULL,
    "origin_country" TEXT NOT NULL,
    "destination_country" TEXT NOT NULL,
    "cargo_type" TEXT NOT NULL,
    "status_container" "STATUS_CONTAINER" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "containers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "containers_ship_id_status_container_idx" ON "containers"("ship_id", "status_container");

-- CreateIndex
CREATE INDEX "containers_terminal_id_status_container_idx" ON "containers"("terminal_id", "status_container");

-- CreateIndex
CREATE INDEX "containers_created_at_idx" ON "containers"("created_at" DESC);
