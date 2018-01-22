//Buffer 缓冲区
// JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
// 但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
// 在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
//方法 1	创建长度为 10 字节的 Buffer 实例：
var buf = new Buffer(10);
// 方法 2	通过给定的数组创建 Buffer 实例：
var buf = new Buffer([10, 20, 30, 40, 50]);
// 方法 3	通过一个字符串来创建 Buffer 实例：
var buf = new Buffer("www.runoob.com", "utf-8");// utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。

//写入缓冲区
var buf = new Buffer(256);
len = buf.write("I am L");
console.log("写入字节数：" + len);

//从缓冲区读取数据
var buf = new Buffer(26);
for (var i = 0; i < buf.length; i++) {
	buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz//ascii,美国信息交换标准码
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

//将Buffer转换为JSON对象
var buf = new Buffer("I am L");
var json = buf.toJSON(buf);
console.log(json);// console.log("这里加文字就无效了不知为啥" + json);

//缓冲区合并
var buffer1 = new Buffer("前端开发");
var buffer2 = new Buffer("I am L");
var buffer3 = new Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容：" + buffer3.toString());

//缓冲区比较
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);//返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同
if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}

//拷贝缓冲区
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer(2);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

//缓冲区裁剪
var buffer1 = new Buffer("I am L");
var buffer2 = buffer1.slice(0,4);
console.log("buffer2 content:" + buffer2.toString());

//缓冲区长度
var buffer = new Buffer("I am L");
console.log("buffer length:" + buffer.length);
/*
方法参考手册	以下列出了 Node.js Buffer 模块常用的方法（注意有些方法在旧版本是没有的）：
 */
// new Buffer(size) 分配一个新的 size 大小单位为8位字节的 buffer。 注意, size 必须小于 kMaxLength，否则，将会抛出异常 RangeError。
// new Buffer(buffer) 拷贝参数 buffer 的数据到 Buffer 实例。
// new Buffer(str[, encoding])分配一个新的 buffer ，其中包含着传入的 str 字符串。 encoding 编码方式默认为 'utf8'。
// buf.length返回这个 buffer 的 bytes 数。注意这未必是 buffer 里面内容的大小。length 是 buffer 对象所分配的内存数，它不会随着这个 buffer 对象内容的改变而改变。
// buf.write(string[, offset[, length]][, encoding])根据参数 offset 偏移量和指定的 encoding 编码方式，将参数 string 数据写入buffer。 offset 偏移量默认值是 0, encoding 编码方式默认是 utf8。 length 长度是将要写入的字符串的 bytes 大小。 返回 number 类型，表示写入了多少 8 位字节流。如果 buffer 没有足够的空间来放整个 string，它将只会只写入部分字符串。 length 默认是 buffer.length - offset。 这个方法不会出现写入部分字符。
// buf.writeUIntLE(value, offset, byteLength[, noAssert])将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算，例如：var b = new Buffer(6); b.writeUIntBE(0x1234567890ab, 0, 6); // <Buffer 12 34 56 78 90 ab>noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
// buf.writeUIntBE(value, offset, byteLength[, noAssert])将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
// buf.writeIntLE(value, offset, byteLength[, noAssert])将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
// buf.writeIntBE(value, offset, byteLength[, noAssert])将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
// buf.readUIntLE(offset, byteLength[, noAssert])支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
// buf.readUIntBE(offset, byteLength[, noAssert])支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
// buf.readIntLE(offset, byteLength[, noAssert])支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
// buf.readIntBE(offset, byteLength[, noAssert])支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
// buf.toString([encoding[, start[, end]]])根据 encoding 参数（默认是 'utf8'）返回一个解码过的 string 类型。还会根据传入的参数 start (默认是 0) 和 end (默认是 buffer.length)作为取值范围。
// buf.toJSON()将 Buffer 实例转换为 JSON 对象。
// buf[index]获取或设置指定的字节。返回值代表一个字节，所以返回值的合法范围是十六进制0x00到0xFF 或者十进制0至 255。
// buf.equals(otherBuffer)比较两个缓冲区是否相等，如果是返回 true，否则返回 false。
// buf.compare(otherBuffer)比较两个 Buffer 对象，返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])buffer 拷贝，源和目标可以相同。 targetStart 目标开始偏移和 sourceStart 源开始偏移默认都是 0。 sourceEnd 源结束位置偏移默认是源的长度 buffer.length 。
// buf.slice([start[, end]])剪切 Buffer 对象，根据 start(默认是 0 ) 和 end (默认是 buffer.length ) 偏移和裁剪了索引。 负的索引是从 buffer 尾部开始计算的。
// buf.readUInt8(offset[, noAssert])根据指定的偏移量，读取一个有符号 8 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 如果这样 offset 可能会超出buffer 的末尾。默认是 false。
// buf.readUInt16LE(offset[, noAssert])根据指定的偏移量，使用特殊的 endian 字节序格式读取一个有符号 16 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
// buf.readUInt16BE(offset[, noAssert])根据指定的偏移量，使用特殊的 endian 字节序格式读取一个有符号 16 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
// buf.readUInt32LE(offset[, noAssert])根据指定的偏移量，使用指定的 endian 字节序格式读取一个有符号 32 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
// buf.readUInt32BE(offset[, noAssert])根据指定的偏移量，使用指定的 endian 字节序格式读取一个有符号 32 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
// buf.readInt8(offset[, noAssert])根据指定的偏移量，读取一个 signed 8 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
// buf.readInt16LE(offset[, noAssert])根据指定的偏移量，使用特殊的 endian 格式读取一个 signed 16 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
// buf.readInt16BE(offset[, noAssert])根据指定的偏移量，使用特殊的 endian 格式读取一个 signed 16 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
// buf.readInt32LE(offset[, noAssert])根据指定的偏移量，使用指定的 endian 字节序格式读取一个 signed 32 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
// buf.readInt32BE(offset[, noAssert])根据指定的偏移量，使用指定的 endian 字节序格式读取一个 signed 32 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
// buf.readFloatLE(offset[, noAssert])根据指定的偏移量，使用指定的 endian 字节序格式读取一个 32 位浮点数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer的末尾。默认是 false。
// buf.readFloatBE(offset[, noAssert])根据指定的偏移量，使用指定的 endian 字节序格式读取一个 32 位浮点数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer的末尾。默认是 false。
// buf.readDoubleLE(offset[, noAssert])根据指定的偏移量，使用指定的 endian字节序格式读取一个 64 位double。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
// buf.readDoubleBE(offset[, noAssert])根据指定的偏移量，使用指定的 endian字节序格式读取一个 64 位double。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
// buf.writeUInt8(value, offset[, noAssert])根据传入的 offset 偏移量将 value 写入 buffer。注意：value 必须是一个合法的有符号 8 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则不要使用。默认是 false。
// buf.writeUInt16LE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的有符号 16 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeUInt16BE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的有符号 16 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeUInt32LE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式(LITTLE-ENDIAN:小字节序)将 value 写入buffer。注意：value 必须是一个合法的有符号 32 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着value 可能过大，或者offset可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeUInt32BE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式(Big-Endian:大字节序)将 value 写入buffer。注意：value 必须是一个合法的有符号 32 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者offset可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeInt8(value, offset[, noAssert])
// buf.writeInt16LE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 16 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false 。
// buf.writeInt16BE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 16 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false 。
// buf.writeInt32LE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 32 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeInt32BE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 32 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeFloatLE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer 。注意：当 value 不是一个 32 位浮点数类型的值时，结果将是不确定的。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeFloatBE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer 。注意：当 value 不是一个 32 位浮点数类型的值时，结果将是不确定的。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeDoubleLE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个有效的 64 位double 类型的值。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成value被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.writeDoubleBE(value, offset[, noAssert])根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个有效的 64 位double 类型的值。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成value被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
// buf.fill(value[, offset][, end])使用指定的 value 来填充这个 buffer。如果没有指定 offset (默认是 0) 并且 end (默认是 buffer.length) ，将会填充整个buffer。