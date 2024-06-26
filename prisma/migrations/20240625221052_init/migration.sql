-- CreateTable
CREATE TABLE "Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cc" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliveredBy" TEXT NOT NULL,
    "deliveryAt" DATETIME NOT NULL,
    "deliveryTime" DATETIME NOT NULL,
    "comodatarieId" INTEGER NOT NULL,
    "costCenter" TEXT NOT NULL,
    "responsibleManager" TEXT NOT NULL,
    "ticketCode" TEXT NOT NULL,
    "generalObservations" TEXT NOT NULL,
    "attachments" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Record_comodatarieId_fkey" FOREIGN KEY ("comodatarieId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "patrimonyNumber" TEXT NOT NULL,
    "equipmentCondition" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "flow" TEXT NOT NULL,
    "entryType" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Equipment_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EquipmentsType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_AttachmentToRecord" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AttachmentToRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "Attachment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AttachmentToRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "Record" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentsType_name_key" ON "EquipmentsType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AttachmentToRecord_AB_unique" ON "_AttachmentToRecord"("A", "B");

-- CreateIndex
CREATE INDEX "_AttachmentToRecord_B_index" ON "_AttachmentToRecord"("B");
