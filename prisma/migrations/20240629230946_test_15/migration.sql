-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliveredByWorkerId" INTEGER NOT NULL,
    "deliveryAt" DATETIME,
    "deliveryTime" DATETIME,
    "borrowerId" INTEGER NOT NULL,
    "costCenter" TEXT,
    "responsibleManager" TEXT,
    "ticketCode" TEXT,
    "generalObservations" TEXT,
    "shift" TEXT,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Record_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Record_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Record_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Record_deliveredByWorkerId_fkey" FOREIGN KEY ("deliveredByWorkerId") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("borrowerId", "costCenter", "createdAt", "createdById", "deliveredByWorkerId", "deliveryAt", "deliveryTime", "generalObservations", "id", "responsibleManager", "shift", "ticketCode", "updatedAt") SELECT "borrowerId", "costCenter", "createdAt", "createdById", "deliveredByWorkerId", "deliveryAt", "deliveryTime", "generalObservations", "id", "responsibleManager", "shift", "ticketCode", "updatedAt" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
