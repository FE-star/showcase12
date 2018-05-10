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
参考 ./middlewares/error.js
