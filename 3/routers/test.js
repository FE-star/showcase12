/*
 * @Author: kael 
 * @Date: 2018-05-10 21:28:31 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-10 22:12:25
 */

module.exports = (router) => {

  // curl http://localhost:3000/test
  router.all('/', async (ctx, next) => {
    ctx.body = 'hello world';
  });

  // curl http://localhost:3000/test/error
  router.all('/error', async (ctx, next) => {
    throw new Error('ooooh!');
  });

};
