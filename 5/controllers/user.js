/*
 * @Author: kael 
 * @Date: 2018-05-11 18:15:05 
 * @Last Modified by: kael
 * @Last Modified time: 2019-06-02 17:51:57
 */

const userService = require('../services/user');

module.exports = (router) => {

  router.post('/register', async (ctx, next) => {
    ctx.body = await userService.register(ctx, ctx.params);
  });

  router.post('/login', async (ctx, next) => {
    ctx.body = await userService.login(ctx, ctx.params);
  });

  router.put('/password', async (ctx, next) => {
    ctx.body = await userService.update_password(ctx, ctx.params);
  });

};

