/*
 * @Author: kael 
 * @Date: 2018-05-10 21:28:31 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 16:31:45
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
  // setInterval(() => {
  //   (new Image()).src = `http://localhost:3000/test/params?r=${Math.random()}&t=${Date.now()}`;
  // }, 100);
  router.all('/params', async (ctx, next) => {
    ctx.body = ctx.params;
  });

};
