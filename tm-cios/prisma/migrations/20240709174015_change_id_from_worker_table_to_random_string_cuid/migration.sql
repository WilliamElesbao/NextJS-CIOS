/*
  Warnings:

  - The primary key for the `Worker` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Record] DROP CONSTRAINT [Record_borrowerId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Record] DROP CONSTRAINT [Record_deliveredByWorkerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Record] ALTER COLUMN [deliveredByWorkerId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Record] ALTER COLUMN [borrowerId] NVARCHAR(1000) NOT NULL;

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[Worker] DROP CONSTRAINT [Worker_registration_key];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Worker'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Worker] (
    [id] NVARCHAR(1000) NOT NULL,
    [registration] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [cc] NVARCHAR(1000) NOT NULL,
    [manager] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Worker_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Worker_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Worker_registration_key] UNIQUE NONCLUSTERED ([registration])
);
IF EXISTS(SELECT * FROM [dbo].[Worker])
    EXEC('INSERT INTO [dbo].[_prisma_new_Worker] ([cc],[createdAt],[email],[id],[manager],[name],[registration],[status],[updatedAt]) SELECT [cc],[createdAt],[email],[id],[manager],[name],[registration],[status],[updatedAt] FROM [dbo].[Worker] WITH (holdlock tablockx)');
DROP TABLE [dbo].[Worker];
EXEC SP_RENAME N'dbo._prisma_new_Worker', N'Worker';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[Record] ADD CONSTRAINT [Record_borrowerId_fkey] FOREIGN KEY ([borrowerId]) REFERENCES [dbo].[Worker]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Record] ADD CONSTRAINT [Record_deliveredByWorkerId_fkey] FOREIGN KEY ([deliveredByWorkerId]) REFERENCES [dbo].[Worker]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
