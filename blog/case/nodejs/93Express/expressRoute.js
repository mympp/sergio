// 路由
// 在 expressServer.js 中我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。

var express = require('express');
var app = express();

// 主页输出“Hello L world”
app.get('/',function(req,res){
    console.log("主页 GET 请求");
    res.send('Hello GET');
})

// POST 请求。未解。这里和上面的GET请求有啥区别？
app.post('/',function(req,res){
    console.log("主页 POST 请求");
    res.send('Hello POST');
})

// /del_user 页面响应
app.get('/del_user',function(req,res){
    console.log("/del_user 响应 DELETE 请求");
    res.send('删除页面');
})

// /list_user 页面 GET 请求
app.get('/list_user',function(req,res){
    console.log("/list_user GET 请求");
    res.send("用户列表页面");
})

// 对页面 abcd,abxcd,ab123cd,等响应 GET 请求
app.get('/ab*cd',function(req,res){
    console.log("/ab*cd GET 请求");
    res.send("正则匹配");
})

var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://",host,port)
})
// 尝试访问 http://192.168.1.220:8081/子页面