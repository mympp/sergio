// 通过 post 将两个输入框的值转换为JSON格式
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended:false})

app.use(express.static('public'));

app.get('/postIndex.html', function (req, res) {
    res.sendFile( __dirname + "/" + "postIndex.html" );
    // res.send("test");
})

app.post('/process_post', urlencodedParser, function (req, res) {

    // 输出 JSON 格式
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
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