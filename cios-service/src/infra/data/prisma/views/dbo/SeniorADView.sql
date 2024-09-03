SELECT
  NEWID() AS rowId,
  FG.Tipcol,
  FG.nomfun,
  FG.codccu,
  FG.nomccu,
  FG.emailcomercial,
  FG.emailparticular,
  FG.datadm,
  FG.codcar,
  FG.titcar,
  FG.datnas,
  FG.datafa,
  FG.nroempresa,
  FG.nomeempresa,
  FG.codfil,
  FG.nomfil,
  FG.NOMECHEFIA,
  FG.SITUACAO,
  FG.numcpf,
  FG.numcad,
  AD.employeeID,
  AD.employeeNumber,
  AD.extensionAttribute1,
  AD.displayName,
  AD.samAccountName,
  AD.mail,
  AD.givenName,
  AD.sn,
  AD.manager,
  AD.st,
  AD.ipPhone,
  AD.company,
  AD.department,
  AD.Title,
  AD.Mobile,
  AD.TelephoneNumber,
  AD.extensionAttribute3,
  AD.ATIVO
FROM
  [SENIOR_PROD].[dbo].[_FuncGeral] AS FG FULL
  JOIN [dbo].[AdView] AS AD ON CAST(FG.numcad AS NVARCHAR) = AD.employeeNumber
  AND CAST(FG.numcpf AS NVARCHAR) = AD.employeeID;