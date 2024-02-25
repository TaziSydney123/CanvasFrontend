/*
  Warnings:

  - You are about to drop the column `content` on the `Canvas` table. All the data in the column will be lost.
  - Added the required column `Content` to the `Canvas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Canvas" DROP COLUMN "content",
ADD COLUMN     "Content" TEXT NOT NULL;
