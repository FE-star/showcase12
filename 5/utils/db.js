/*
 * @Author: kael 
 * @Date: 2019-06-02 16:53:59 
 * @Last Modified by: kael
 * @Last Modified time: 2019-06-02 17:54:51
 */

// http://mongodb.github.io/node-mongodb-native/3.0/api/

const MongoClient = require('mongodb').MongoClient;
const logger = require('../utils/logger')();

const CONF = global.config.mongodb;
const MongoUrl = `${CONF.url}`;
const options = {
  useNewUrlParser: true,
  poolSize: CONF.maxPoolSize,
};

const STORE = {};
const connect = async () => {
  if (STORE.db) return STORE.db;
  try {
    // http://mongodb.github.io/node-mongodb-native/3.0/reference/connecting/connection-settings/
    STORE.client = await MongoClient.connect(MongoUrl, options);
    STORE.db = STORE.client.db(CONF.dbName);
    logger.info('Mongodb Connect Success:', MongoUrl);
    await uniqueIndex(STORE.db, 'user', 'username');
  } catch (error) {
    STORE.client = STORE.db = null;
    logger.error('Mongodb Connect Error:', MongoUrl, error);
  } finally {
    global.mongodb = STORE.client;
  }
  return STORE.db;
};

const get = async () => {
  if (STORE.connect) return STORE.connect;
  return STORE.connect = connect();
};

async function uniqueIndex(DB, modelname, field) {
  try {
    let name = '' + modelname;
    await DB.createCollection(name);
    let conn = await DB.collection(name);
    logger.info('createIndex:', { [field]: 1 }, { unique: true });
    await conn.createIndex({ [field]: 1 }, { unique: true });
  } catch (error) {
    logger.error('createIndex error:', modelname, field, error.message);
  }
}


module.exports = {
  get,
  uniqueIndex,
};
