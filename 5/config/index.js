/*
 * @Author: kael 
 * @Date: 2018-05-11 17:28:48 
 * @Last Modified by: kael
 * @Last Modified time: 2018-08-19 19:09:34
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
    conf.port = process.env.PORT;
  }

  return conf;
}