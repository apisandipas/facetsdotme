/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `ThemeSettings` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImage` on the `ThemeSettings` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundStyle` on the `ThemeSettings` table. All the data in the column will be lost.
  - You are about to drop the column `gradientDirection` on the `ThemeSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ThemeSettings" DROP COLUMN "backgroundColor",
DROP COLUMN "backgroundImage",
DROP COLUMN "backgroundStyle",
DROP COLUMN "gradientDirection",
ADD COLUMN     "bgColor" TEXT,
ADD COLUMN     "bgGradientDirection" TEXT,
ADD COLUMN     "bgImage" TEXT,
ADD COLUMN     "bgStyle" "BackgroundStyle" NOT NULL DEFAULT 'SOLID',
ADD COLUMN     "buttonBGColor" TEXT,
ADD COLUMN     "buttonFGColor" TEXT,
ADD COLUMN     "buttonShadowColor" TEXT;
