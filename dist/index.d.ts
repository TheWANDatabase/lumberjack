export default class Logger {
  readonly source: string;
  readonly version: string;
  readonly metadata: any;
  private remote;
  private writeToLog;

  constructor(module: string, version: string, metadata?: any);

  log(...args: any[]): Promise<bigint>;

  info(...args: any[]): Promise<bigint>;

  warn(...args: any[]): Promise<bigint>;

  error(...args: any[]): Promise<bigint>;

  debug(...args: any[]): Promise<bigint>;
}
//# sourceMappingURL=index.d.ts.map