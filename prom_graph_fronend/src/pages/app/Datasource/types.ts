export interface RuntimeInfo {
  startTime: string;
  CWD: string;
  reloadConfigSuccess: string;
  lastConfigTime: string;
  corruptionCount: string;
  goroutineCount: string;
  GOMAXPROCS: string;
  GOGC:string;
  GODEBUG: string;
  storageRetention: string;
}

export interface BuildInfo {
  version: string;
  revision: string;
  branch: string;
  buildUser:string;
  buildDate: string;
  goVersion: string;
}

export interface HeadStats {
  [key:string]:string | number
}

export interface TSDBInfo {
  headStats: HeadStats;
}

export interface DatasourceConfig {
  yaml:string
}
