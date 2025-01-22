/*
  Warnings:

  - You are about to drop the column `currentPrice` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `lastPriceUpdate` on the `Stock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "currentPrice",
DROP COLUMN "lastPriceUpdate";
