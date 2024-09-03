export type SeniorADViewTypes = {
  Tipcol: number;
  nomfun?: string;
  codccu?: string;
  nomccu?: string;
  emailcomercial?: string;
  emailparticular?: string;
  datadm?: Date | null;
  codcar?: string;
  titcar?: string;
  datnas?: Date | null;
  datafa?: Date | null;
  nroempresa?: number;
  nomeempresa?: string;
  codfil?: number;
  nomfil?: string;
  NOMECHEFIA?: string;
  SITUACAO?: string;
  numcpf?: bigint;
  numcad?: number;
  employeeID?: string;
  employeeNumber?: string;
  extensionAttribute1?: string;
  displayName?: string;
  samAccountName?: string;
  mail?: string;
  givenName?: string;
  sn?: string;
  manager?: string;
  st?: string;
  ipPhone?: string;
  company?: string;
  department?: string;
  Title?: string;
  Mobile?: string;
  TelephoneNumber?: string;
  extensionAttribute3?: string;
  ATIVO?: string;
};

export type CiosWorkers = {
  id: string;
  registration: string;
  name: string;
  email?: string;
  cc: string;
  supervisor?: string;
  manager?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UsersMap = {
  [key: string]: string;
};
