/*
 * @Author: kael 
 * @Date: 2018-05-10 21:11:34 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-10 21:50:40
 */

const Koa = require('koa');
const app = new Koa();

const compress = require('koa-compress')({ flush: 2 });
const conditional = require('koa-conditional-get')();
const bodyparser = require('koa-bodyparser')();
const etag = require('koa-etag')();

app.keys = ['appkeys'];

app
  .use(conditional)
  .use(etag)
  .use(compress)
  .use(bodyparser)

const Router = require('koa-router');
const testRouter = new Router({ prefix: '/test' });
require('./routers/test')(testRouter);
app.use(testRouter.routes());

// const fs = require('fs');
// const path = require('path');
// const Router = require('koa-router');
// ((root = './routers') => {
//   fs.readdirSync(root).forEach(filename => {
//     let file = path.parse(filename);
//     console.log('load router:', filename);
//     if (file.ext.toLowerCase() !== '.js') return;
//     const router = new Router({ prefix: `/${file.name}` });
//     require(`${root}/${file.name}`)(router);
//     app.use(router.routes());
//   });
// })();

app.listen(3000);