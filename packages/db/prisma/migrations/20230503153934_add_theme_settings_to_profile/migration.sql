/*
  Warnings:

  - A unique constraint covering the columns `[themeSettingsId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `themeSettingsId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ButtonStyle" AS ENUM ('SOLID_RECT', 'SOLID_ROUNDISH', 'SOLID_ROUND', 'OUTLINE_RECT', 'OUTLINE_ROUNDISH', 'OUTLINE_ROUND', 'SOFT_SHADOW_RECT', 'SOFT_SHADOW_ROUNDISH', 'SOFT_SHADOW_ROUND', 'HARD_SHADOW_RECT', 'HARD_SHADOW_ROUNDISH', 'HARD_SHADOW_ROUND');

-- CreateEnum
CREATE TYPE "BackgroundStyle" AS ENUM ('SOLID', 'GRADIENT', 'IMAGE');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "themeSettingsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ThemeSettings" (
    "id" TEXT NOT NULL,
    "backgroundStyle" "BackgroundStyle" NOT NULL DEFAULT 'SOLID',
    "buttonStyle" "ButtonStyle" NOT NULL DEFAULT 'SOLID_RECT',
    "backgroundColor" TEXT,
    "backgroundImage" TEXT,
    "gradientDirection" TEXT,

    CONSTRAINT "ThemeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_themeSettingsId_key" ON "Profile"("themeSettingsId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_themeSettingsId_fkey" FOREIGN KEY ("themeSettingsId") REFERENCES "ThemeSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
