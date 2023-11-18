"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const datakit_1 = require("datakit");
const snowflake_1 = require("@sapphire/snowflake");
const epoch = new Date('2023-11-18T19:20:36.127Z');
const snowflake = new snowflake_1.Snowflake(epoch);

class Logger {
    source;
    version;
    metadata = {};
    remote;

    constructor(module, version, metadata = {}) {
        this.remote = new datakit_1.Client();
        this.source = module;
        this.version = version;
        this.metadata = metadata;
    }

    log(...args) {
        return this.writeToLog("log", ...args);
    }

    info(...args) {
        return this.writeToLog("info", ...args);
    }

    warn(...args) {
        return this.writeToLog("warn", ...args);
    }

    error(...args) {
        return this.writeToLog("error", ...args);
    }

    debug(...args) {
        return this.writeToLog("debug", ...args);
    }

    writeToLog(level, ...args) {
        return new Promise((resolve, reject) => {
            const id = snowflake.generate();
            this.remote.data.insert(datakit_1.logs).values({
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
                .catch(() => reject(new Error("Failed to write to log.")));
            console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}] ${this.source}:`, ...args);
        });
    }
}

exports.default = Logger;
