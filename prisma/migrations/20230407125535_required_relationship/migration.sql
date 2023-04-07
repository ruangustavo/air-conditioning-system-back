/*
  Warnings:

  - Made the column `roomId` on table `air_conditioners` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "air_conditioners" DROP CONSTRAINT "air_conditioners_roomId_fkey";

-- AlterTable
ALTER TABLE "air_conditioners" ALTER COLUMN "roomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "air_conditioners" ADD CONSTRAINT "air_conditioners_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
