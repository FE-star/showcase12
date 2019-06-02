/*
 * @Author: kael 
 * @Date: 2018-05-11 18:17:03 
 * @Last Modified by: kael
 * @Last Modified time: 2019-06-02 17:56:37
 */

const logger = require('../utils/logger')();
const DB = require('../utils/db');
const crypto = require('crypto');

function md5(str) {
  str = (new Buffer(str)).toString("binary");
  var ret = crypto.createHash("md5").update(str).digest("hex");
  return ret;
}

module.exports = {
  register: async (ctx, params = {}) => {
    if (!params.username || !params.password) {
      let error = new Error('参数错误');
      error.status = 400;
      throw error;
    }
    let db = await DB.get();
    let collection = await db.collection('user');
    let data = {
      username: params.username,
      password: md5(params.password),
      created_at: new Date(),
      updated_at: new Date(),
      status: 'normal',
      remark: ''
    };
    logger.info('register:', data);
    let rs = await collection.insert(data);
    return rs.result;
  },
  login: async (ctx, params = {}) => {
    if (!params.username || !params.password) {
      let error = new Error('参数错误');
      error.status = 400;
      throw error;
    }
    let db = await DB.get();
    let collection = await db.collection('user');
    let result = await collection.findOne({
      username: params.username,
      password: md5(params.password),
    });
    if (result) {
      return `hello ${params.username}`;
    } else {
      throw new Error('用户名或密码错误');
    }
  },
  update_password: async (ctx, params = {}) => {
    if (!params.username || !params.old_password || !params.new_password) {
      let error = new Error('参数错误');
      error.status = 400;
      throw error;
    }
    let db = await DB.get();
    let collection = await db.collection('user');
    let newData = {
      password: md5(params.new_password),
      updated_at: new Date(),
    };
    logger.info('update data:', newData);
    let { result } = await collection.updateOne(
      {
        username: params.username,
        password: md5(params.old_password),
      },
      {
        "$set": newData,
      },
    );
    return result.nModified === 1 ? '修改成功' : '用户名或密码错误';
  },
}