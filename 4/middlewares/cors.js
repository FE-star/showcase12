/*
 * @Author: kael 
 * @Date: 2018-05-10 22:20:45 
 * @Last Modified by:   kael 
 * @Last Modified time: 2018-05-10 22:20:45 
 */

const URL = require('url');

// 允许跨域访问
// curl -i http://localhost:3000/test
module.exports = async function(ctx, next) {
  let origin = URL.parse(ctx.get('origin') || ctx.get('referer') || '');
  if (origin.protocol && origin.host) {
    ctx.set('Access-Control-Allow-Origin', `${origin.protocol}//${origin.host}`);
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, User-Agent, Referer, Content-Type, Cache-Control');
    ctx.set('Access-Control-Allow-Credentials', 'true');
  }
  if (ctx.method !== 'OPTIONS') {
    await next();
  } else {
    ctx.body = '';
  }
};
