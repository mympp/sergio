/*
path,几个常用的API。
path.normalize
将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，还能去掉多余的斜杠。如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性。以下是一个例子：
  var cache = {};

  function store(key, value) {
      cache[path.normalize(key)] = value;
  }

  store('foo/bar', 1);
  store('foo//baz//../bar', 2);
  console.log(cache);  // => { "foo/bar": 2 }
坑出没注意： 标准化之后的路径里的斜杠在Windows系统下是\，而在Linux系统下是/。如果想保证任何系统下都使用/作为路径分隔符的话，需要用.replace(/\\/g, '/')再替换一下标准路径。
path.join
将传入的多个路径拼接为标准路径。该方法可避免手工拼接路径字符串的繁琐，并且能在不同系统下正确使用相应的路径分隔符。以下是一个例子：
  path.join('foo/', 'baz/', '../bar'); // => "foo/bar"
path.extname
当我们需要根据不同文件扩展名做不同操作时，该方法就显得很好用。以下是一个例子：
  path.extname('foo/bar.js'); // => ".js"
path模块提供的其余方法也不多，稍微看一下官方文档就能全部掌握。
*/
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
// wriFile();
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

// 读取文件
function reaFile(){
    var fs = require("fs");
    var buf = new Buffer(1024);
    console.log("一定要打开文件才能读取吗？是的。");
    fs.open('input.txt', 'r+', function(err,fd){
        if (err) {
            return console.error(err);
        }
        console.log("文件已经打开了！");
        console.log("准备读取文件...");
        fs.read(fd, buf, 0, buf.length, 0, function(err,bytes){
            if (err) {
                console.error(err);
            }
            console.log("文件已经打开");
            // 仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0,bytes).toString());
            }
        });
    });
}
// reaFile();
/*
Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于Buffer，更像是可以做指针操作的C语言数组。例如，可以用[index]方式直接修改某个位置的字节。
bin[0] = 0x48;
而.slice方法也不是返回一个新的Buffer，而更像是返回了指向原Buffer中间的某个位置的指针，如下所示。
[ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
    ^           ^
    |           |
   bin     bin.slice(2)
因此对.slice方法返回的Buffer的修改会作用于原Buffer，例如：
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>
也因此，如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
总之，Buffer将JS的数据处理能力从字符串扩展到了任意二进制数据。
*/
/*
异步模式下读取文件的语法格式：
    fs.read(fd, buffer, offset, length, position, callback)
该方法使用了文件描述符来读取文件。
参数使用说明如下：
    fd - 通过 fs.open() 方法返回的文件描述符。
    buffer - 数据写入的缓冲区。
    offset - 缓冲区写入的写入偏移量。
    length - 要从文件中读取的字节数。
    position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
    callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象
*/

// 关闭文件
function cloFile(){
    var fs = require("fs");
    var buf = new Buffer(1024);
    console.log("一定要打开文件才能读取吗？是的。");
    fs.open('input.txt', 'r+', function(err,fd){
        if (err) {
            return console.error(err);
        }
        console.log("文件已经打开了！");
        console.log("准备读取文件...");
        fs.read(fd, buf, 0, buf.length, 0, function(err,bytes){
            if (err) {
                console.error(err);
            }
            console.log("文件已经打开");
            // 仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0,bytes).toString());
            }
        });
        // 关闭文件
        fs.close(fd, function(err){
            if (err){
                console.log(err);
            } 
            console.log("文件关闭成功");
        });
    });
}
// cloFile();
/*
异步模式下关闭文件的语法格式：
    fs.close(fd, callback)
该方法使用了文件描述符来读取文件。
参数使用说明如下：
    fd - 通过 fs.open() 方法返回的文件描述符。
    callback - 回调函数，没有参数。
*/

// 截取文件
function truncateFile(){
    var fs = require("fs");
    var buf = new Buffer(1024);
    console.log("准备打开文件...");
    fs.open('input.txt', 'r+', function(err,fd){
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
        console.log("开始截取10字节后的文件内容");

        // 截取文件
        fs.ftruncate(fd, 10, function(err){
            if (err) {
                console.error(err);
            }
            console.log('文件截取成功！');
            console.log("开始读取相同文件");
            fs.read(fd, buf, 0, buf.length, 0, function(err,bytes){
                if (err) {
                    console.error(err);
                }
                // 仅输出读取的文件
                if (bytes > 0) {
                    console.log(buf.slice(0,bytes).toString());
                }
                // 关闭文件
                fs.close(fd, function(err){
                    if (err) {
                        console.error(err);
                    }
                    console.log("文件关闭成功");
                });
            });
        });
    });
}
// truncateFile();
/*
异步模式下截取文件的语法格式：
    fs.ftruncate(fd, len, callback)
该方法使用了文件描述符来读取文件。
参数使用说明如下：
    fd - 通过 fs.open() 方法返回的文件描述符。
    len - 文件内容截取的长度。
    callback - 回调函数，没有参数。
*/

// 删除文件
function unlinkFile(){
    var fs = require("fs");
    console.log("准备删除文件...");
    fs.unlink('input1.txt', function(err){
        if (err) {
            return console.error(err);
        }
        console.log("删除成功！");
    });
}
// unlinkFile();
/*
删除文件的语法格式：
    fs.unlink(path, callback)
参数使用说明如下：
    path - 文件路径。
    callback - 回调函数，没有参数。
*/

// 创建目录
function mkDir(){
    var fs = require("fs");
    console.log("创建目录 /tmp/test/");
    fs.mkdir("tmp/test",function(err){// 这里要一级一级创建目录，先创建tmp再创建test
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功。");
    });
}
// mkDir();
/*
创建目录的语法格式：
    fs.mkdir(path[, mode], callback)
参数使用说明如下：
    path - 文件路径。
    mode - 设置目录权限，默认为 0777。
    callback - 回调函数，没有参数。
*/

// 读取目录
function readDir(){
    var fs = require("fs");
    console.log("查看/tmp目录");
    fs.readdir('tmp/', function(err,files){
        if (err) {
            return console.error(err);
        }
        files.forEach(function(file){
            console.log(files);
        })
    });
}
// readDir();
/*
读取目录的语法格式：
    fs.readdir(path, callback)
参数使用说明如下：
    path - 文件路径。
    callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。
*/

// 删除目录
function rmDir(){
    var fs = require("fs");
    console.log("准备删除目录/tmp/test");
    fs.rmdir('tmp/test', function(err){
        if (err) {
            return console.error(err);
        }
        console.log("读取 /tmp目录");
        fs.readdir('tmp/', function(err,files){
            if (err) {
                return console.error(err);
            }
            files.forEach(function(file){
                console.log(file);
            })
        });
        console.log("删除成功！");
    });
}
// rmDir();
/*
删除目录的语法格式：
    fs.rmdir(path, callback)
参数使用说明如下：
    path - 文件路径。
    callback - 回调函数，没有参数。
*/

// 文件模块方法参考：
/*
fs.rename(oldPath, newPath, callback)异步 rename().回调函数没有参数，但可能抛出异常。
fs.ftruncate(fd, len, callback)异步 ftruncate().回调函数没有参数，但可能抛出异常。
fs.ftruncateSync(fd, len)同步 ftruncate()
fs.truncate(path, len, callback)异步 truncate().回调函数没有参数，但可能抛出异常。
fs.truncateSync(path, len)同步 truncate()
fs.chown(path, uid, gid, callback)异步 chown().回调函数没有参数，但可能抛出异常。
fs.chownSync(path, uid, gid)同步 chown()
fs.fchown(fd, uid, gid, callback)异步 fchown().回调函数没有参数，但可能抛出异常。
fs.fchownSync(fd, uid, gid)同步 fchown()
fs.lchown(path, uid, gid, callback)异步 lchown().回调函数没有参数，但可能抛出异常。
fs.lchownSync(path, uid, gid)同步 lchown()
fs.chmod(path, mode, callback)异步 chmod().回调函数没有参数，但可能抛出异常。
fs.chmodSync(path, mode)同步 chmod().
fs.fchmod(fd, mode, callback)异步 fchmod().回调函数没有参数，但可能抛出异常。
fs.fchmodSync(fd, mode)同步 fchmod().
fs.lchmod(path, mode, callback)异步 lchmod().回调函数没有参数，但可能抛出异常。Only available on Mac OS X.
fs.lchmodSync(path, mode)同步 lchmod().
fs.stat(path, callback)异步 stat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。
fs.lstat(path, callback)异步 lstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。
fs.fstat(fd, callback)异步 fstat(). 回调函数有两个参数 err, stats，stats 是 fs.Stats 对象。
fs.statSync(path)同步 stat(). 返回 fs.Stats 的实例。
fs.lstatSync(path)同步 lstat(). 返回 fs.Stats 的实例。
fs.fstatSync(fd)同步 fstat(). 返回 fs.Stats 的实例。
fs.link(srcpath, dstpath, callback)异步 link().回调函数没有参数，但可能抛出异常。
fs.linkSync(srcpath, dstpath)同步 link().
fs.symlink(srcpath, dstpath[, type], callback)异步 symlink().回调函数没有参数，但可能抛出异常。 type 参数可以设置为 'dir', 'file', 或 'junction' (默认为 'file') 。
fs.symlinkSync(srcpath, dstpath[, type])同步 symlink().
fs.readlink(path, callback)异步 readlink(). 回调函数有两个参数 err, linkString。
fs.realpath(path[, cache], callback)异步 realpath(). 回调函数有两个参数 err, resolvedPath。
fs.realpathSync(path[, cache])同步 realpath()。返回绝对路径。
fs.unlink(path, callback)异步 unlink().回调函数没有参数，但可能抛出异常。
fs.unlinkSync(path)同步 unlink().
fs.rmdir(path, callback)异步 rmdir().回调函数没有参数，但可能抛出异常。
fs.rmdirSync(path)同步 rmdir().
fs.mkdir(path[, mode], callback)S异步 mkdir(2).回调函数没有参数，但可能抛出异常。 mode defaults to 0777.
fs.mkdirSync(path[, mode])同步 mkdir().
fs.readdir(path, callback)异步 readdir(3). 读取目录的内容。
fs.readdirSync(path)同步 readdir().返回文件数组列表。
fs.close(fd, callback)异步 close().回调函数没有参数，但可能抛出异常。
fs.closeSync(fd)同步 close().
fs.open(path, flags[, mode], callback)异步打开文件。
fs.openSync(path, flags[, mode])同步 version of fs.open().
fs.utimes(path, atime, mtime, callback)
fs.utimesSync(path, atime, mtime)修改文件时间戳，文件通过指定的文件路径。
fs.futimes(fd, atime, mtime, callback)
fs.futimesSync(fd, atime, mtime)修改文件时间戳，通过文件描述符指定。
fs.fsync(fd, callback)异步 fsync.回调函数没有参数，但可能抛出异常。
fs.fsyncSync(fd)同步 fsync.
fs.write(fd, buffer, offset, length[, position], callback)将缓冲区内容写入到通过文件描述符指定的文件。
fs.write(fd, data[, position[, encoding]], callback)通过文件描述符 fd 写入文件内容。
fs.writeSync(fd, buffer, offset, length[, position])同步版的 fs.write()。
fs.writeSync(fd, data[, position[, encoding]])同步版的 fs.write().
fs.read(fd, buffer, offset, length, position, callback)通过文件描述符 fd 读取文件内容。
fs.readSync(fd, buffer, offset, length, position)同步版的 fs.read.
fs.readFile(filename[, options], callback)异步读取文件内容。
fs.readFileSync(filename[, options])
fs.writeFile(filename, data[, options], callback)异步写入文件内容。
fs.writeFileSync(filename, data[, options])同步版的 fs.writeFile。
fs.appendFile(filename, data[, options], callback)异步追加文件内容。
fs.appendFileSync(filename, data[, options])The 同步 version of fs.appendFile.
fs.watchFile(filename[, options], listener)查看文件的修改。
fs.unwatchFile(filename[, listener])停止查看 filename 的修改。
fs.watch(filename[, options][, listener])查看 filename 的修改，filename 可以是文件或目录。返回 fs.FSWatcher 对象。
fs.exists(path, callback)检测给定的路径是否存在。
fs.existsSync(path)同步版的 fs.exists.
fs.access(path[, mode], callback)测试指定路径用户权限。
fs.accessSync(path[, mode])同步版的 fs.access。
fs.createReadStream(path[, options])返回ReadStream 对象。
fs.createWriteStream(path[, options])返回 WriteStream 对象。
fs.symlink(srcpath, dstpath[, type], callback)异步 symlink().回调函数没有参数，但可能抛出异常。
*/