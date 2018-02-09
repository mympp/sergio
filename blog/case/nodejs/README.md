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
    - node_modules+package-lock.json Express框架的文件

    - expressServer.js Express搭建server
    - expressRoute.js Express搭建路由器，指定脚本响应客户端页面URL请求
    - expressStatic.js Express内置 express.static 设置静态文件 就可以通过 http://192.168.1.220:8081/images/myLword.jpg 访问文件了。
    - public 静态文件

    - getIndex.html 通过GET方法提交两个参数，通过 getServer.js 的 process_get 路由器处理输入
    - getServer.js 是 getIndex.html 的服务器

    - postIndex.html 通过 POST 方法提交两个参数，通过 getServer.js 的 process_get 路由器处理输入
    - postServer.js 是 postIndex.html 的服务器

    - uploadPost.html 上传文件的HTML页面
    - uploadServer.js 上传文件的服务器以及路由
    
- 94RESTful 基于REST架构的Web Servers。
    - users.json 用户数据组
    - getList.js 获取用户数据
    - addUser.js 新建新用户数据
    - idUser.js 用户详情
    - deleteUser.js 删除用户数据

- 95MultiProcess Node.js多进程。nodejs单线程，使用事件驱动来处理多并发。
    在多核 cpu 的系统上创建多个子进程，每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。
    - Node 提供了 child_process 模块来创建子进程，方法有：
    - exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
    - spawn - child_process.spawn 使用指定的命令行参数创建新进程。
    - fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。