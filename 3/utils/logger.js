/*
 * @Author: kael 
 * @Date: 2018-05-10 21:53:27 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-10 22:08:13
 */

const log4js = require('log4js');

// https://log4js-node.github.io/log4js-node/
log4js.configure({
  appenders: { 'out': { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } }
});

module.exports = (name) => {

  if (!name) {
    // get filename
    let error = (new Error()).stack.toString().split('\n')[2] || '';
    name = (error.match(/[\\\/\(]([-\w\.]+.\w+):\d+:\d+\)$/) || [])[1] || 'unknow';
  }

  return log4js.getLogger(name);
};
