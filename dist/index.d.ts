export default class Logger {
  readonly source: string;
  readonly version: string;
  readonly metadata: any;
  private remote;
  private writeToLog;

  constructor(module: string, version: string, metadata?: any);

  log(...args: any[]): bigint;

  info(...args: any[]): bigint;

  warn(...args: any[]): bigint;

  error(...args: any[]): bigint;

  debug(...args: any[]): bigint;
}
//# sourceMappingURL=index.d.ts.map