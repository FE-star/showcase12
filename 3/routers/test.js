/*
 * @Author: kael 
 * @Date: 2018-05-10 21:28:31 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-10 22:25:30
 */

module.exports = (router) => {

  // curl http://localhost:3000/test
  router.all('/', async (ctx, next) => {
    ctx.body = 'hello world';
  });

  // curl -i http://localhost:3000/test/error
  router.all('/error', async (ctx, next) => {
    throw new Error('ooooh!');
  });

  // curl http://localhost:3000/test/params?test=123&idcard=44000019890327237x
  router.all('/params', async (ctx, next) => {
    ctx.body = ctx.params;
  });

};
