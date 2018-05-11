/*
 * @Author: kael 
 * @Date: 2018-05-11 16:19:15 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 16:30:50
 */

const logger = require('../utils/logger')();

// get client ip
const REGEX_IPV4 = /\d+\.\d+\.\d+\.\d+$/;
function realip(ctx) {
  return ctx.get('x-real-ip') || (ctx.ip.match(REGEX_IPV4) || [])[0] || 'unknow ip';
}

// create random id
function uuid() {
  return [
    (+new Date).toString(36).substr(-6),
    Math.random().toString(36).substr(-10),
  ].join('').toUpperCase();
}

module.exports = function(opts = {}) {
  const rid_name = opts.rid_name || 'rid';
  return async function(ctx, next) {
    let start = Date.now();

    // request id
    let rid = ctx.cookies.get(rid_name);
    if (!rid) {
      ctx.cookies.set(rid_name, rid = uuid());
    }

    await next();

    let headers = ctx.headers || {};
    let cost = Date.now() - start;
    logger.mark(
      rid,
      realip(ctx),
      cost + 'ms',
      ctx.method,
      ctx.status,
      ctx.url,
      ctx.params,
      headers['user-agent'] || '',
      headers.referer || headers.referrer || '',
      ctx.body
    );
  }
}