# Step 5

## 配置
+ 参考 ./config

## 数据库
```bash
docker run -it -d -p 27017:27017 mongo
```

## MVC
+ routers -> controllers
+ 添加 services, 参考 user.js
+ view ?

## 性能
+ 参考 https://github.com/wg/wrk
+ wrk -t10 -c100 -d5s http://localhost:3000/test/delay?delay=300
+ apache benchmark
+ ab -c 100 -n 10000 -k http://localhost:3000/test/delay?delay=300
+ 怎么优化？
+ cluster

## docker
+ 安装 docker
+ 创建 Dockerfile
+ bulid & run

## 接口文档？

## 测试用例？

## 部署？
+ pm2 start index.js
