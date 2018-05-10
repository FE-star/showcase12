/*
 * @Author: kael 
 * @Date: 2018-05-10 21:28:31 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-10 21:40:03
 */

module.exports = (router) => {

  // curl http://localhost:3000/test
  router.all('/', async (ctx, next) => {
    ctx.body = 'hello world';
  });

};
