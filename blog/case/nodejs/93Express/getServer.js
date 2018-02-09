// 通过get将两个输入框的值转换为JSON格式
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/getIndex.html', function (req, res) {
    res.sendFile( __dirname + "/" + "getIndex.html" );
    // res.send("test");
})

app.get('/process_get', function (req, res) {

    // 输出 JSON 格式
    response = {
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };
    // 在控制台打印的json格式两个值
    console.log(response);
    // 输出到浏览器JSON格式的两个值
    res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 ",host,port)

})