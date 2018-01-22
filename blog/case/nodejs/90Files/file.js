// 异步和同步
function fileSync(){
    var fs = require("fs");
    // 异步读取
    fs.readFile("input.txt",function(err,data){
        if (err) {
            return console.error(err);
        }
        console.log("异步读取：" + data.toString());
    });
    //同步读取
    var data = fs.readFileSync('input.txt');
    console.log("同步读取：" + data.toString());
    console.log("Over！");
}
// fileSync();

// 异步打开文件
function openFile(){
    var fs = require("fs");
    console.log("准备打开文件...");
    fs.open('input.txt', 'r+', function(err,fd){
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
    });
}
// openFile();
/*
异步模式下打开文件的语法格式：
    fs.open(path, flags[, mode], callback)
参数
参数使用说明如下：
    path - 文件的路径。
    flags - 文件打开的行为。具体值详见下文。
    mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
    callback - 回调函数，带有两个参数如：callback(err, fd)。
flags 参数可以是以下值：
    r 以读取模式打开文件。如果文件不存在抛出异常。
    r+ 以读写模式打开文件。如果文件不存在抛出异常。
    rs 以同步的方式读取文件。
    rs+ 以同步的方式读取和写入文件。
    w 以写入模式打开文件，如果文件不存在则创建。
    wx 类似 'w'，但是如果文件路径存在，则文件写入失败。
    w+ 以读写模式打开文件，如果文件不存在则创建。
    wx+ 类似 'w+'， 但是如果文件路径存在，则文件读写失败。
    a 以追加模式打开文件，如果文件不存在则创建。
    ax 类似 'a'， 但是如果文件路径存在，则文件追加失败。
    a+ 以读取追加模式打开文件，如果文件不存在则创建。
    ax+ 类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。
*/

// 获取文件信息
function statFile(){
    var fs = require("fs");
    console.log("准备打开文件...");
    fs.stat('input.txt', function(err,stats){
        if (err) {
            return console.error(err);
        }
        console.log(stats);
        console.log("读取文件信息成功！");
        //检测文件类型
        console.log("是否问文件(isFile)?" + stats.isFile());
        console.log("是否为目录(isDirectory)?" + stats.isDirectory());
    });
}
// statFile();
/*
异步模式获取文件信息的语法格式：
    fs.stat(path, callback)

参数使用说明如下：
    path - 文件路径。
    callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
    fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。

stats类中的方法有：
    stats.isFile() 如果是文件返回 true，否则返回 false。
    stats.isDirectory() 如果是目录返回 true，否则返回 false。
    stats.isBlockDevice() 如果是块设备返回 true，否则返回 false。
    stats.isCharacterDevice() 如果是字符设备返回 true，否则返回 false。
    stats.isSymbolicLink() 如果是软链接返回 true，否则返回 false。
    stats.isFIFO() 如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
    stats.isSocket() 如果是 Socket 返回 true，否则返回 false。
*/

// 写入文件
function wriFile(){
    var fs = require("fs");
    console.log("准备写入文件...");
    fs.writeFile('input.txt', '我是通过写入的data', function(err){
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("---分割线---");
        console.log("读取写入的文件");
        fs.readFile('input.txt', function(err,data){
            if (err) {
                return console.log(err);
            }
            console.log("异步读取文件数据：" + data.toString());
        });
    });
}
wriFile();
/*
异步模式下写入文件的语法格式：
    fs.writeFile(filename, data[, options], callback)
如果文件存在，该方法写入的内容会覆盖旧的文件内容。
参数使用说明如下：
    path - 文件路径。
    data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
    options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
    callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
*/