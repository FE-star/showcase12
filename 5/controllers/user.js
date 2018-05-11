/*
 * @Author: kael 
 * @Date: 2018-05-11 18:15:05 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 18:23:06
 */

const userService = require('../services/user');

module.exports = (router) => {

  router.post('/register', async (ctx, next) => {
    ctx.body = await userService.register(ctx, ctx.params);
  });

  router.post('/login', async (ctx, next) => {
    ctx.body = await userService.login(ctx, ctx.params);
  });

};

