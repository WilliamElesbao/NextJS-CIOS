/*
  Warnings:

  - The primary key for the `EquipmentsType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordId" INTEGER NOT NULL,
    "equipamentType" TEXT NOT NULL,
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
INSERT INTO "new_Equipment" ("createdAt", "description", "entryType", "equipamentType", "equipmentCondition", "flow", "id", "observations", "patrimonyNumber", "recordId", "serialNumber", "status", "updatedAt") SELECT "createdAt", "description", "entryType", "equipamentType", "equipmentCondition", "flow", "id", "observations", "patrimonyNumber", "recordId", "serialNumber", "status", "updatedAt" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
CREATE TABLE "new_EquipmentsType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_EquipmentsType" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "EquipmentsType";
DROP TABLE "EquipmentsType";
ALTER TABLE "new_EquipmentsType" RENAME TO "EquipmentsType";
CREATE UNIQUE INDEX "EquipmentsType_name_key" ON "EquipmentsType"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
