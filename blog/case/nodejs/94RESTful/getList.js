// HTTP 方法
// 以下为 REST 基本架构的四个方法：
// GET - 用于获取数据。
// PUT - 用于更新或添加数据。
// DELETE - 用于删除数据。
// POST - 用于添加数据。

// 获取用户列表
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})