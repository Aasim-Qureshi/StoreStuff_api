/*
  Warnings:

  - A unique constraint covering the columns `[folderPath]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Folder_folderPath_key" ON "Folder"("folderPath");
