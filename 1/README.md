# Step 1

## 添加 router
```bash
npm i koa-router
```

```js
const Router = require('koa-router');
const testRouter = new Router({ prefix: '/test' });
require('./routers/test')(testRouter);
app.use(testRouter.routes());
```

## 简单封装 router
```js
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
((root = './routers') => {
  fs.readdirSync(root).forEach(filename => {
    let file = path.parse(filename);
    console.log('load router:', filename);
    if (file.ext.toLowerCase() !== '.js') return;
    const router = new Router({ prefix: `/${file.name}` });
    require(`${root}/${file.name}`)(router);
    app.use(router.routes());
  });
})();
```