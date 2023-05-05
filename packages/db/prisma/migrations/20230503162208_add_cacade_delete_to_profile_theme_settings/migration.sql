-- DropForeignKey
ALTER TABLE "ThemeSettings" DROP CONSTRAINT "ThemeSettings_profileId_fkey";

-- AddForeignKey
ALTER TABLE "ThemeSettings" ADD CONSTRAINT "ThemeSettings_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
