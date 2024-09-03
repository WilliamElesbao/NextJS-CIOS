/*
  Warnings:

  - You are about to drop the `_AttachmentToRecord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recordId` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AttachmentToRecord_B_index";

-- DropIndex
DROP INDEX "_AttachmentToRecord_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AttachmentToRecord";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attachment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filename" TEXT NOT NULL,
    "recordId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Attachment_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attachment" ("createdAt", "filename", "id", "updatedAt") SELECT "createdAt", "filename", "id", "updatedAt" FROM "Attachment";
DROP TABLE "Attachment";
ALTER TABLE "new_Attachment" RENAME TO "Attachment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
