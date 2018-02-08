// Express提供了内置中间件 express.static 来设置静态文件。未实现。
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
    res.send('Hello L world');
})

var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址：http://",host,port);
})