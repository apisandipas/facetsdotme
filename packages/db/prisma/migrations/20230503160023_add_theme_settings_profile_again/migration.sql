/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImage` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundStyle` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `buttonStyle` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `gradientDirection` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "backgroundColor",
DROP COLUMN "backgroundImage",
DROP COLUMN "backgroundStyle",
DROP COLUMN "buttonStyle",
DROP COLUMN "gradientDirection";

-- CreateTable
CREATE TABLE "ThemeSettings" (
    "id" TEXT NOT NULL,
    "backgroundStyle" "BackgroundStyle" NOT NULL DEFAULT 'SOLID',
    "buttonStyle" "ButtonStyle" NOT NULL DEFAULT 'SOLID_RECT',
    "backgroundColor" TEXT,
    "backgroundImage" TEXT,
    "gradientDirection" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "ThemeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ThemeSettings_profileId_key" ON "ThemeSettings"("profileId");

-- AddForeignKey
ALTER TABLE "ThemeSettings" ADD CONSTRAINT "ThemeSettings_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
