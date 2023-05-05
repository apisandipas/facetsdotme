/*
  Warnings:

  - You are about to drop the column `themeSettingsId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ThemeSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_themeSettingsId_fkey";

-- DropIndex
DROP INDEX "Profile_themeSettingsId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "themeSettingsId",
ADD COLUMN     "backgroundColor" TEXT,
ADD COLUMN     "backgroundImage" TEXT,
ADD COLUMN     "backgroundStyle" "BackgroundStyle" NOT NULL DEFAULT 'SOLID',
ADD COLUMN     "buttonStyle" "ButtonStyle" NOT NULL DEFAULT 'SOLID_RECT',
ADD COLUMN     "gradientDirection" TEXT;

-- DropTable
DROP TABLE "ThemeSettings";
