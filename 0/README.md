# Step 0

## 项目初始化 npm init & npm install
+ 参考 https://github.com/koajs/koa

## 添加中间件
```bash
npm i koa-conditional-get
npm i koa-etag
npm i koa-compress
npm i koa-bodyparser
```

```js
const compress = require('koa-compress')({ flush: 2 });
const conditional = require('koa-conditional-get')();
const bodyparser = require('koa-bodyparser')();
const etag = require('koa-etag')();

app
  .use(conditional)
  .use(etag)
  .use(compress)
  .use(bodyparser)
```
