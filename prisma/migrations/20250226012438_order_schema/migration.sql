/*
  Warnings:

  - You are about to drop the `t_scafford_books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "t_scafford_books";

-- CreateTable
CREATE TABLE "t_scafford_orders" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category" VARCHAR NOT NULL,
    "labels" TEXT[],
    "metadata" JSONB NOT NULL,
    "cdate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_scafford_orders_pkey" PRIMARY KEY ("id")
);

CREATE INDEX idx_labels ON t_scafford_orders USING GIN ("labels");
CREATE INDEX idx_metadata ON t_scafford_orders USING GIN ("metadata");