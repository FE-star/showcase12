/*
 * @Author: kael 
 * @Date: 2018-05-10 22:21:01 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-10 22:25:42
 */

module.exports = async function(ctx, next) {
  const r = ctx.request || {};
  ctx.params = Object.assign({}, r.query, r.body, ctx.params);
  if (ctx.params.idcard) {
    ctx.params.idcard = String(ctx.params.idcard).toUpperCase();
  }
  await next();
};
