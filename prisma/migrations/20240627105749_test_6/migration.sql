-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordId" INTEGER NOT NULL,
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
    CONSTRAINT "Equipment_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipment" ("createdAt", "description", "entryType", "equipmentCondition", "flow", "id", "observations", "patrimonyNumber", "recordId", "serialNumber", "status", "updatedAt") SELECT "createdAt", "description", "entryType", "equipmentCondition", "flow", "id", "observations", "patrimonyNumber", "recordId", "serialNumber", "status", "updatedAt" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliveredByWorkerId" INTEGER,
    "deliveryAt" DATETIME,
    "deliveryTime" DATETIME,
    "borrowerId" INTEGER NOT NULL,
    "costCenter" TEXT,
    "responsibleManager" TEXT,
    "ticketCode" TEXT,
    "generalObservations" TEXT,
    "attachments" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Record_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Record_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("attachments", "borrowerId", "costCenter", "createdAt", "createdById", "deliveredByWorkerId", "deliveryAt", "deliveryTime", "generalObservations", "id", "responsibleManager", "ticketCode", "updatedAt") SELECT "attachments", "borrowerId", "costCenter", "createdAt", "createdById", "deliveredByWorkerId", "deliveryAt", "deliveryTime", "generalObservations", "id", "responsibleManager", "ticketCode", "updatedAt" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
