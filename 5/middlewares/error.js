/*
 * @Author: kael
 * @Date: 2017-04-12 17:03:24
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-10 22:13:42
 */

const logger = require('../utils/logger')();

module.exports = async function(ctx, next) {
  try {
    await next();
  } catch (error) {
    error = error || new Error('unknow error');
    if (error.expected) return;
    logger.fatal(`error: ${error.message}, stack: ${error.stack}`);
    ctx.set('cache-control', 'no-cache, max-age=0');
    ctx.status = error.status || 500;
    ctx.type = 'json';
    ctx.body = {
      // stack: error.stack,
      message: error.message,
    };
  }
};
