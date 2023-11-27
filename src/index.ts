import {Client, logs} from "datakit";
import {Snowflake} from "@sapphire/snowflake";

const epoch = new Date('2023-11-18T19:20:36.127Z');
const snowflake = new Snowflake(epoch);

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
    return this.writeToLog("log", ...args)
  }

  public info(...args: any[]) {
    return this.writeToLog("info", ...args)
  }

  public warn(...args: any[]) {
    return this.writeToLog("warn", ...args)
  }

  public error(...args: any[]) {
    return this.writeToLog("error", ...args)
  }

  public debug(...args: any[]) {
    return this.writeToLog("debug", ...args)
  }

  private writeToLog(level: string, ...args: any[]): bigint {
    let ts = new Date();
    console.log(`[${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}] [${level.toUpperCase()}] ${this.source}:`, ...args)
    const id = snowflake.generate();
    new Promise((resolve, reject) => {

      this.remote.data.insert(logs).values({
        id: id,
        source: this.source,
        level: level,
        message: args.join(" "),
        meta: {
          version: this.version,
          ...this.metadata
        }
      })
        .then(() => resolve(id))
        .catch(reject)

    }).then(r => () => r).catch(e => () => e);

    return id;
  }
}