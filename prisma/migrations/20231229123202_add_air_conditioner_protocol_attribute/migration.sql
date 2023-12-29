/*
  Warnings:

  - Added the required column `protocol` to the `air_conditioners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "air_conditioners" ADD COLUMN     "protocol" TEXT NOT NULL;
