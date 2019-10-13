/*
 * @Author: kael 
 * @Date: 2019-10-13 19:48:00 
 * @Last Modified by: kael
 * @Last Modified time: 2019-10-13 19:48:30
 */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  require('./index');

  console.log(`Worker ${process.pid} started`);
}