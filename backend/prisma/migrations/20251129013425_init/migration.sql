/*
  Warnings:

  - The `mutationType` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `severity` on the `Incident` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "severity",
ADD COLUMN     "severity" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "mutationType",
ADD COLUMN     "mutationType" TEXT;

-- DropEnum
DROP TYPE "MutationType";

-- DropEnum
DROP TYPE "Severity";
