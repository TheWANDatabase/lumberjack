export default class Logger {
  readonly source: string;
  readonly version: string;
  readonly metadata: any;
  private remote;

  constructor(module: string, version: string, metadata?: any);

  log(...args: any[]): Promise<bigint>;

  info(...args: any[]): Promise<bigint>;

  warn(...args: any[]): Promise<bigint>;

  error(...args: any[]): Promise<bigint>;

  debug(...args: any[]): Promise<bigint>;

  private writeToLog;
}
//# sourceMappingURL=index.d.ts.map