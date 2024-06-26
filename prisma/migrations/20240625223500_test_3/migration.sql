/*
  Warnings:

  - You are about to drop the column `comodatarieId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredBy` on the `Record` table. All the data in the column will be lost.
  - Added the required column `borrowerId` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveredByWorkerId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliveredByWorkerId" INTEGER NOT NULL,
    "deliveryAt" DATETIME NOT NULL,
    "deliveryTime" DATETIME NOT NULL,
    "borrowerId" INTEGER NOT NULL,
    "costCenter" TEXT NOT NULL,
    "responsibleManager" TEXT NOT NULL,
    "ticketCode" TEXT NOT NULL,
    "generalObservations" TEXT NOT NULL,
    "attachments" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Record_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("attachments", "costCenter", "createdAt", "deliveryAt", "deliveryTime", "generalObservations", "id", "responsibleManager", "ticketCode", "updatedAt") SELECT "attachments", "costCenter", "createdAt", "deliveryAt", "deliveryTime", "generalObservations", "id", "responsibleManager", "ticketCode", "updatedAt" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
