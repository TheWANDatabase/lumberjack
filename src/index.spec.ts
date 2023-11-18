import {assert} from "chai";
import {Client, logs} from "datakit";
import Logger from "./";
import {eq} from "drizzle-orm";

describe('Logger', () => {

  const client = new Client();

  const meta = {
    source: 'Automated Testing Via Mocha'
  };

  describe('#constructor()', () => {
    it('should create a new logger', () => {
      const logger = new Logger('test', 'test', meta);
      assert.deepEqual(logger.metadata, meta);
    });
  })

  describe('#log()', async () => {
    it('should log a message with the \'LOG\' level type', async () => {
      const logger = new Logger('test', 'test', meta);
      let logid = await logger.log('test');
      let entry = await client.data.select().from(logs).where(eq(logs.id, logid));
      assert.equal(entry[0].level, 'log');
    });
  })

  describe('#info()', async () => {
    it('should log a message with the \'INFO\' level type', async () => {
      const logger = new Logger('test', 'test', meta);
      let logid = await logger.info('test');
      let entry = await client.data.select().from(logs).where(eq(logs.id, logid));
      assert.equal(entry[0].level, 'info');
    });
  })

  describe('#warn()', async () => {
    it('should log a message with the \'WARN\' level type', async () => {
      const logger = new Logger('test', 'test', meta);
      let logid = await logger.warn('test');
      let entry = await client.data.select().from(logs).where(eq(logs.id, logid));
      assert.equal(entry[0].level, 'warn');
    });
  })

  describe('#error()', async () => {
    it('should log a message with the \'ERROR\' level type', async () => {
      const logger = new Logger('test', 'test', meta);
      let logid = await logger.error('test');
      let entry = await client.data.select().from(logs).where(eq(logs.id, logid));
      assert.equal(entry[0].level, 'error');
    });
  })

  describe('#debug()', async () => {
    it('should log a message with the \'DEBUG\' level type', async () => {
      const logger = new Logger('test', 'test', meta);
      let logid = await logger.debug('test');
      let entry = await client.data.select().from(logs).where(eq(logs.id, logid));
      assert.equal(entry[0].level, 'debug');
    });
  })
});