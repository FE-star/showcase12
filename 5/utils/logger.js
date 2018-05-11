/*
 * @Author: kael 
 * @Date: 2018-05-10 21:53:27 
 * @Last Modified by: kael
 * @Last Modified time: 2018-05-11 17:02:01
 */

const log4js = require('log4js');

// https://log4js-node.github.io/log4js-node/
log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    logstash: {
      url: 'http://127.0.0.1:9200/_bulk',
      type: 'logstashHTTP',
      logType: 'application',
      logChannel: 'node',
      application: 'logstash-log4js',
      layout: {
        type: 'pattern',
        pattern: '%m'
      }
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' }
    // default: { appenders: ['console', 'logstash'], level: 'info' }
  }
});

module.exports = (name) => {

  if (!name) {
    // get filename
    let error = (new Error()).stack.toString().split('\n')[2] || '';
    name = (error.match(/[\\\/\(]([-\w\.]+.\w+):\d+:\d+\)$/) || [])[1] || 'unknow';
  }

  return log4js.getLogger(name);
};
