//函数传递
//向creatServer函数传递了一个匿名函数
var http = require("http");
http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hello World");
	response.end();
}).listen(8888);
//或者这样写：
// var http = require("http");
// function onRequest(request,response){
// 	response.writeHead(200,{"Content-Type":"text/plain"});
// 	response.write("Hello World");
// 	response.end();
// }
// http.createServer(onRequest).listen(8888);

// node.js路由

//相关HTTP服务器node.js路由内容详见笔记