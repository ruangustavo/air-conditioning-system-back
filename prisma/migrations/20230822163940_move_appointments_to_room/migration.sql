/*
  Warnings:

  - You are about to drop the column `air_conditioner_id` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_air_conditioner_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "air_conditioner_id",
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
