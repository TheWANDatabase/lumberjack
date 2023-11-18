import {Client, logs} from "datakit";

export default class Logger {
  readonly source: string;
  readonly version: string;
  readonly metadata: any = {};
  private remote: any;

  constructor(module: string, version: string, metadata: any = {}) {
    this.remote = new Client();

    this.source = module;
    this.version = version;
    this.metadata = metadata;
  }

  public log(...args: any[]) {
    this.writeToLog("log", ...args)
  }

  public info(...args: any[]) {
    this.writeToLog("info", ...args)
  }

  public warn(...args: any[]) {
    this.writeToLog("warn", ...args)
  }

  public error(...args: any[]) {
    this.writeToLog("error", ...args)
  }

  public debug(...args: any[]) {
    this.writeToLog("debug", ...args)
  }

  private writeToLog(level: string, ...args: any[]) {
    this.remote.data.insert(logs).values({
      time: new Date(),
      source: this.source,
      level: level,
      message: args.join(" "),
      meta: {
        version: this.version,
        ...this.metadata
      }
    })

    console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}] ${this.source}:`, ...args)
  }
}