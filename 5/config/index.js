/*
 * @Author: kael 
 * @Date: 2018-05-11 17:28:48 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 19:03:19
 */

const logger = require('../utils/logger')();

module.exports = (env) => {
  let conf = Object.assign(
    require(`./default`),
    (() => {
      try {
        return require(`./${env}`);
      } catch (ex) {
        return logger.warn('Get config error.');
      }
    })(),
  );

  // 配置通过环境变量注入
  if (process.env.PORT) {
    conf.port = 8000;
  }

  return conf;
}