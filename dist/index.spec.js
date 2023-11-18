"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const chai_1 = require("chai");
const datakit_1 = require("datakit");
const _1 = __importDefault(require("./"));
const drizzle_orm_1 = require("drizzle-orm");
describe('Logger', () => {
    const client = new datakit_1.Client();
    const meta = {
        source: 'Automated Testing Via Mocha'
    };
    describe('#constructor()', () => {
        it('should create a new logger', () => {
            const logger = new _1.default('test', 'test', meta);
            chai_1.assert.deepEqual(logger.metadata, meta);
        });
    });
    describe('#log()', async () => {
        it('should log a message with the \'LOG\' level type', async () => {
            const logger = new _1.default('test', 'test', meta);
            let logid = await logger.log('test');
            let entry = await client.data.select().from(datakit_1.logs).where((0, drizzle_orm_1.eq)(datakit_1.logs.id, logid));
            chai_1.assert.equal(entry[0].level, 'log');
        });
    });
    describe('#info()', async () => {
        it('should log a message with the \'INFO\' level type', async () => {
            const logger = new _1.default('test', 'test', meta);
            let logid = await logger.info('test');
            let entry = await client.data.select().from(datakit_1.logs).where((0, drizzle_orm_1.eq)(datakit_1.logs.id, logid));
            chai_1.assert.equal(entry[0].level, 'info');
        });
    });
    describe('#warn()', async () => {
        it('should log a message with the \'WARN\' level type', async () => {
            const logger = new _1.default('test', 'test', meta);
            let logid = await logger.warn('test');
            let entry = await client.data.select().from(datakit_1.logs).where((0, drizzle_orm_1.eq)(datakit_1.logs.id, logid));
            chai_1.assert.equal(entry[0].level, 'warn');
        });
    });
    describe('#error()', async () => {
        it('should log a message with the \'ERROR\' level type', async () => {
            const logger = new _1.default('test', 'test', meta);
            let logid = await logger.error('test');
            let entry = await client.data.select().from(datakit_1.logs).where((0, drizzle_orm_1.eq)(datakit_1.logs.id, logid));
            chai_1.assert.equal(entry[0].level, 'error');
        });
    });
    describe('#debug()', async () => {
        it('should log a message with the \'DEBUG\' level type', async () => {
            const logger = new _1.default('test', 'test', meta);
            let logid = await logger.debug('test');
            let entry = await client.data.select().from(datakit_1.logs).where((0, drizzle_orm_1.eq)(datakit_1.logs.id, logid));
            chai_1.assert.equal(entry[0].level, 'debug');
        });
    });
});
