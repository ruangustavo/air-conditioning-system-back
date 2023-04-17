/*
  Warnings:

  - You are about to drop the column `roomId` on the `air_conditioners` table. All the data in the column will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "air_conditioners" DROP CONSTRAINT "air_conditioners_roomId_fkey";

-- AlterTable
ALTER TABLE "air_conditioners" DROP COLUMN "roomId";

-- DropTable
DROP TABLE "rooms";
