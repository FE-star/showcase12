/*
 * @Author: kael 
 * @Date: 2018-05-11 16:50:10 
 * @Last Modified by:   kael 
 * @Last Modified time: 2018-05-11 16:50:10 
 */

module.exports = (router) => {

  router.get('/', async (ctx, next) => {
    ctx.body = 'pass';
  });

};