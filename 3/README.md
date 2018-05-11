# Step 3

## 添加异常处理
```js
process.on('unhandledRejection', (err) => {
  logger.fatal(`unhandledRejection: ${err.message}, stack: ${err.stack}`);
});

process.on('uncaughtException', (err) => {
  logger.fatal(`uncaughtException: ${err.message}, stack: ${err.stack}`);
});
```

## 自定义中间件
+ 参考 ./middlewares/error.js 等

> 这里可能需要定义很多中间件，比如：对参数的预处理、CORS 支持、CSRF、监控告警等

