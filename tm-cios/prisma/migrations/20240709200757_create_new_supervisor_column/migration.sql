BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Worker] ADD [supervisor] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
