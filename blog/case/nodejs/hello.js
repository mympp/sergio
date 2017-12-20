//hello.js
//把对象封装到hello.js模块中
function hello(){
	console.log("L");
	var name;
	this.setName = function(thyName){
		name = thyName;
	};
	this.sayHello = function(){
		console.log("Hello " + name);
	};
};
hello();
module.exports = hello;