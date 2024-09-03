SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''4*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''A*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''B*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''C*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''D*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''E*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''F*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''G*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''H*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''I*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''J*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''K*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''L*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''M*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''N*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''O*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''P*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''Q*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''R*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''S*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''T*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''U*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''V*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''W*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''X*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''Y*'''
  )
UNION
ALL
SELECT
  *,
  'ATIVO' = CASE
    WHEN userAccountControl & 2 = 0 THEN 'ATIVO'
    ELSE 'INATIVO'
  END
FROM
  OPENQUERY(
    ADSI,
    '
    SELECT logonCount, accountExpires, employeeID, manager, employeeNumber, displayName, samAccountName, mail, givenName, ipPhone, st, lastLogon, lastLogonTimestamp, postalCode, sn, company, department, Title, Mobile, TelephoneNumber, extensionAttribute1, extensionAttribute3, userAccountControl
    FROM ''LDAP://DC=tecno,DC=local''
    WHERE objectClass = ''User'' AND objectCategory = ''Person'' AND samAccountName = ''Z*'''
  );