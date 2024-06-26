/*
  Warnings:

  - The primary key for the `Attachment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Attachment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_AttachmentToRecord` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attachment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Attachment" ("createdAt", "filename", "id", "updatedAt") SELECT "createdAt", "filename", "id", "updatedAt" FROM "Attachment";
DROP TABLE "Attachment";
ALTER TABLE "new_Attachment" RENAME TO "Attachment";
CREATE TABLE "new__AttachmentToRecord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AttachmentToRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "Attachment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AttachmentToRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "Record" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__AttachmentToRecord" ("A", "B") SELECT "A", "B" FROM "_AttachmentToRecord";
DROP TABLE "_AttachmentToRecord";
ALTER TABLE "new__AttachmentToRecord" RENAME TO "_AttachmentToRecord";
CREATE UNIQUE INDEX "_AttachmentToRecord_AB_unique" ON "_AttachmentToRecord"("A", "B");
CREATE INDEX "_AttachmentToRecord_B_index" ON "_AttachmentToRecord"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
