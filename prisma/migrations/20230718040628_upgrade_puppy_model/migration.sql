/*
  Warnings:

  - Added the required column `gender` to the `Puppy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isNeutered` to the `Puppy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVaccinated` to the `Puppy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Puppy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Puppy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Puppy" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "isNeutered" BOOLEAN NOT NULL,
ADD COLUMN     "isVaccinated" BOOLEAN NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "traits" TEXT[];
