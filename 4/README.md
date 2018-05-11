# Step 4

## 进一步完善日志
+ 添加 ./middlewares/access.js 中间件

### 安装 elk
+ http://elk-docker.readthedocs.io/
```bash
docker run -it \
  -p 5601:5601 \
  -p 9200:9200 \
  -p 5044:5044 \
  --name elk sebp/elk
```

### 修改 log4js 配置
+ https://github.com/log4js-node/log4js-node/blob/master/examples/logstashHTTP.js
```js
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
```

## 添加健康检查接口
+ 参考 ./routers/healthcheck.js