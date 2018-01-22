/*
模块系统
*/
//获得hello.js的对象     模块接口的唯一变化是使用 module.exports = Hello 代替了exports.world = function(){}。 
//在外部引用该模块时，其接口对象就是要输出的 Hello 对象本身，而不是原先的 exports。
//上面这句话看不懂，详见笔记

var Hello = require('./hello');//./为当前目录node.js默认后缀为js，
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();
//Node.js 提供了exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
//require方法接受以下几种参数的传递：
// ● http、fs、path等，原生模块。
// ● ./mod或../mod，相对路径的文件模块。
// ● /pathtomodule/mod，绝对路径的文件模块。
// ● mod，非原生模块的文件模块。