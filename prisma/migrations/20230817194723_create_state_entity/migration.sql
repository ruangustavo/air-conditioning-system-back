/*
  Warnings:

  - You are about to drop the column `state` on the `air_conditioners` table. All the data in the column will be lost.
  - Added the required column `state` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "air_conditioners" DROP COLUMN "state";

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "state" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "states" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN NOT NULL,
    "air_conditioner_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_air_conditioner_id_fkey" FOREIGN KEY ("air_conditioner_id") REFERENCES "air_conditioners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
