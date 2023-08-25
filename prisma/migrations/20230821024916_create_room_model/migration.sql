/*
  Warnings:

  - Added the required column `room_id` to the `air_conditioners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "air_conditioners" ADD COLUMN     "room_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "air_conditioners" ADD CONSTRAINT "air_conditioners_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
