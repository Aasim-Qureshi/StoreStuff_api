/*
  Warnings:

  - A unique constraint covering the columns `[folderId]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Folder_spaceId_parentId_idx";

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "folderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Space_folderId_key" ON "Space"("folderId");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("folderId") ON DELETE SET NULL ON UPDATE CASCADE;
