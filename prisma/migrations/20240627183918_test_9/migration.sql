/*
  Warnings:

  - Added the required column `equipamentType` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordId" INTEGER NOT NULL,
    "equipamentType" INTEGER NOT NULL,
    "description" TEXT,
    "serialNumber" TEXT,
    "patrimonyNumber" TEXT,
    "equipmentCondition" TEXT,
    "status" TEXT,
    "flow" TEXT,
    "entryType" TEXT,
    "observations" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Equipment_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipment_equipamentType_fkey" FOREIGN KEY ("equipamentType") REFERENCES "EquipmentsType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipment" ("createdAt", "description", "entryType", "equipmentCondition", "flow", "id", "observations", "patrimonyNumber", "recordId", "serialNumber", "status", "updatedAt") SELECT "createdAt", "description", "entryType", "equipmentCondition", "flow", "id", "observations", "patrimonyNumber", "recordId", "serialNumber", "status", "updatedAt" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
