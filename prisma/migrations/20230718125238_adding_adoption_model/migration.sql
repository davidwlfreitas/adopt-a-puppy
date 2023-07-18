-- AlterTable
ALTER TABLE "Puppy" ADD COLUMN     "adoptionRequirements" TEXT,
ADD COLUMN     "medicalHistory" TEXT;

-- CreateTable
CREATE TABLE "Adoption" (
    "id" SERIAL NOT NULL,
    "puppyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
