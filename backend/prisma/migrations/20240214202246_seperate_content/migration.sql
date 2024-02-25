/*
  Warnings:

  - You are about to drop the column `content` on the `Canvas` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Palatte" AS ENUM ('STANDARD', 'PASTEL');

-- AlterTable
ALTER TABLE "Canvas" DROP COLUMN "content";

-- CreateTable
CREATE TABLE "CanvasContent" (
    "id" TEXT NOT NULL,
    "palate" "Palatte" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "CanvasContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CanvasContent" ADD CONSTRAINT "CanvasContent_id_fkey" FOREIGN KEY ("id") REFERENCES "Canvas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
