/*
 * @Author: kael 
 * @Date: 2018-05-11 18:32:59 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 18:46:33
 */

const logger = require('../utils/logger')();

const LRU = require('lru-cache');
const cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 1, // 1 分钟
});

module.exports = async function(ctx, next) {
  if (ctx.method !== 'GET') return await next();
  let key = `${ctx.path}:${JSON.stringify(ctx.params)}`;
  let value = cache.get(key);
  if (value) {
    ctx.body = value;
  } else {
    await next();
    cache.set(key, ctx.body);
  }
};
