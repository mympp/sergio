/*
流操作
 */
/*
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
从流中读取数据

Node.js，Stream 有四种流类型：
Readable - 可读操作。
Writable - 可写操作。
Duplex - 可读可写操作.
Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
data - 当有数据可读时触发。
end - 没有更多的数据可读时触发。
error - 在接收和写入过程中发生错误时触发。
finish - 所有数据已被写入到底层系统时触发。
*/

// 
function first(){
    var fs = require("fs");
    var data = '';
    // 创建可读流
    var readerStream = fs.createReadStream('input.txt');
    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');
    // 处理流事件 --> data, end, and error，还有一个finish
    readerStream.on('data', function(chunk) {
       data += chunk;
    });
    readerStream.on('end',function(){
       console.log(data);
    });
    readerStream.on('error', function(err){
       console.log(err.stack);
    });
    console.log("程序执行完毕");
}

//写入流	
//将 data 变量的数据写入到 output.txt 文件中
function input(){
    var fs = require("fs");
    var data = '前端';
    // 创建一个可以写入的流，写入到文件 output.txt 中
    var writerStream = fs.createWriteStream('output.txt');//将原本output.txt里面的内容修改了。
    // 使用 utf8 编码写入数据
    writerStream.write(data,'UTF8');
    // 标记文件末尾
    writerStream.end();
    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
        console.log("写入完成。");
    });
    writerStream.on('error', function(err){
       console.log(err.stack);
    });
    console.log("程序执行完毕");
}

//管道流	读取一个文件内容并将内容写入到另外一个文件中
function output(){
    var fs = require("fs");
    //创建一个可读流
    var readerStream = fs.createReadStream("input.txt");
    //创建一个可写流
    var writerStream = fs.createWriteStream("output.txt");
    //管道读写操作
    //读取input.txt文件内容，并将内容写入到output.txt文件中
    readerStream.pipe(writerStream);
    console.log("程序执行完毕");
}

//链式流	通过连接输出流到另外一个流并创建多个对个流操作链的机制。一般用于管道操作
//用管道和链式来压缩和解压文件
//压缩
function compress(){
    var fs = require("fs");
    var zlib = require('zlib');
    //压缩input.txt文件为input.txt.gz
    fs.createReadStream('input.txt')
    	.pipe(zlib.createGzip())
    	.pipe(fs.createWriteStream('input.txt.gz'));
    console.log("文件压缩完成");
}
//解压
function uncompress(){
    // var fs = require("fs");
    // var zlib = require('zlib');
    // // 解压 input.txt.gz 文件为 input.txt
    // fs.createReadStream('input.txt.gz')
    // 	.pipe(zlib.createGunzip())
    // 	.pipe(fs.createWriteStream('input.txt'));
    // console.log("文件解压完成");
    // 不注释报错了：event.js:183	throw er;//Unhandled'error' event
    // Error: unexpected end of file 	at GunzipOnError(zlib.js:153:15)
}
first();
input();
output();
compress();
uncompress();