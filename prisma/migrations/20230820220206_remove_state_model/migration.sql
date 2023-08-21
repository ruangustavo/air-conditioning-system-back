/*
  Warnings:

  - You are about to drop the `states` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "states" DROP CONSTRAINT "states_air_conditioner_id_fkey";

-- AlterTable
ALTER TABLE "air_conditioners" ADD COLUMN     "is_active" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "states";
