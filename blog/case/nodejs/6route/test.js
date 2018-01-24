//函数传递
// 把一个函数作为变量传递。但是我们不一定要绕这个"先定义，再传递"的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数
//向creatServer函数传递了一个匿名函数
var http = require("http");
http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hello World");
	response.end();
}).listen(8008);
//下面这样写也可以达到同样的目的：
// var http = require("http");
// function onRequest(request,response){
// 	response.writeHead(200,{"Content-Type":"text/plain"});
// 	response.write("Hello World");
// 	response.end();
// }
// http.createServer(onRequest).listen(8008);
