1. nodejs通过server.js搭建web服务器，包含请求和相应的基本应用。
2. 而路由决定了由谁(指定脚本)去响应客户端请求。

- 1Nonblocking 解释什么是非阻塞代码
- 2EventTmitter 事件触发器
- 3Buffer 缓冲区
- 4Stream 流
- 5Module 模块
    - 8util 工具
- 6route 路由器
- 7golbal 全局变量
- 90Files 文件操作
- 91GetPost post请求
- 92WebMudule 搭建web服务器，并指定首页。其他页面都有首页跳转。
- 93Express Express是一个nodejs web应用框架。搭配body-parser、cookie-parser、multer模块使用。
    - node_modules Express框架的文件
    - expressServer.js Express搭建server
    - expressRoute.js Express搭建路由器，指定脚本响应客户端页面URL请求
    - expressStatic.js Express内置 express.static 设置静态文件
    - public 静态文件
    - GET_process_get.html 通过GET方法提交两个参数，通过 Get_process_get_server.js 的 process_get 路由器处理输入
    - GET_process_get_server.js 是Get_process_get.html 的服务器
