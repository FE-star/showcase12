/*
 * @Author: kael 
 * @Date: 2018-05-10 21:11:34 
 * @Last Modified by:   kael 
 * @Last Modified time: 2018-05-10 21:11:34 
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

app.listen(3000);