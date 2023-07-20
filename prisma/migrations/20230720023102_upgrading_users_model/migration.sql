-- AlterTable
ALTER TABLE "Adoption" ADD COLUMN     "References" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "identity" TEXT,
ADD COLUMN     "proofOfAddress" TEXT;
