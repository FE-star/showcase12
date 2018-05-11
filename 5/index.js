/*
 * @Author: kael 
 * @Date: 2018-05-10 21:11:34 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 18:57:58
 */

const logger = require('./utils/logger')();
logger.info(`Bootstrapping application`);

global.config = require('./config')(process.env.NODE_ENV);
logger.info('config:', global.config);

const Koa = require('koa');
const app = new Koa();

const compress = require('koa-compress')({ flush: 2 });
const conditional = require('koa-conditional-get')();
const bodyparser = require('koa-bodyparser')();
const etag = require('koa-etag')();

app.keys = ['appkeys'];

const access = require('./middlewares/access')();
const error = require('./middlewares/error');
const cors = require('./middlewares/cors');
const params = require('./middlewares/params');
const cache = require('./middlewares/cache');

app
  .use(error)
  .use(access)
  .use(cors)
  .use(conditional)
  .use(etag)
  .use(compress)
  .use(bodyparser)
  .use(params)
  // .use(cache)

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
((root = './controllers') => {
  fs.readdirSync(root).forEach(filename => {
    let file = path.parse(filename);
    logger.info('load router:', filename);
    if (file.ext.toLowerCase() !== '.js') return;
    const router = new Router({ prefix: `/${file.name}` });
    require(`${root}/${file.name}`)(router);
    app.use(router.routes());
  });
})();

app.listen(global.config.port);

logger.info('Server listening on http://localhost:' + global.config.port);

process.on('unhandledRejection', (err) => {
  logger.fatal(`unhandledRejection: ${err.message}, stack: ${err.stack}`);
});

process.on('uncaughtException', (err) => {
  logger.fatal(`uncaughtException: ${err.message}, stack: ${err.stack}`);
});