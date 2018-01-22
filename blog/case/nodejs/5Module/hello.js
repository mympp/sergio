//hello.js
//把对象封装到hello.js模块中
function hello(){
	console.log("L,这里是hello模块");
	var name;
	this.setName = function(thyName){
		name = thyName;
	};
	this.sayHello = function(){
		console.log("Hello " + name + "这是hello模块的输出值");
	};
};
hello();//这里会再输出一次，因为是同一个模块下
module.exports = hello;
//Node.js 提供了exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
