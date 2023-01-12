-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "severity" TEXT NOT NULL DEFAULT 'info';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 1;
