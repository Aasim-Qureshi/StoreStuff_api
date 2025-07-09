-- DropForeignKey
ALTER TABLE "SpaceMember" DROP CONSTRAINT "SpaceMember_spaceId_fkey";

-- AddForeignKey
ALTER TABLE "SpaceMember" ADD CONSTRAINT "SpaceMember_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("spaceId") ON DELETE CASCADE ON UPDATE CASCADE;
