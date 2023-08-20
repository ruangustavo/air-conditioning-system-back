/*
  Warnings:

  - You are about to drop the `schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_air_conditioner_id_fkey";

-- DropTable
DROP TABLE "schedules";

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN NOT NULL,
    "start_day_of_week" INTEGER NOT NULL,
    "end_day_of_week" INTEGER,
    "is_recurrent" BOOLEAN NOT NULL DEFAULT false,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "air_conditioner_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_air_conditioner_id_fkey" FOREIGN KEY ("air_conditioner_id") REFERENCES "air_conditioners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
