//这个才真正算是我的第一个JS，以前都是对着写甚至直接复制的。
//2017.3.7	sergiolin

//JavaScript中的最重要的类型是对象
//对象是名/值对的集合，或字符串到值映射的集合
var book{//对象是有花括号括起来的
	topic:"JavaScript";//属性“topic”的值是“JavaScript”
	fat:true//属性“fat”的值是true
};//右花括号标记了对象的借宿

//通过“.”或“[]”来访问对象属性
book.topic//=>“JavaScript”
book["fat"]//=>ture:另外一种获取属性的方式
book.author="Flanagan";//通过赋值创建一个新属性
book.contents={};//{}是一个空对象，它没有属性

//JavaScript同样支持数组（以数字为索引的列表）
var primes=[2,3,5,7];//拥有四个值的数组，由“[”和“]”划定边界
primes[0]//=>：数组中的第一个元素（索引为0）
primes.length//=>4：数组中的元素个数
primes[primes.length-1]//=>7：数组的最优一个元素
primes[4]=9;//通过赋值来添加新元素
primes[4]=11;//或通过赋值来改变已有的元素
var empty=[];//[]是空数组，它具有0个元素
empty.length//=>0

//数组和对象中都可以包含另一个数组或对象
var points=[//具有两个元素的数组
	{x:0,y:0},//每个元素都是一个对象
	{x:1,y:1}
];
var data={//一个包含两个属性的对象
	trial1:[[1,2],[3,4]],//没一个属性都是数组
	trial2:[[2,3],[4,5]]//数组的元素也是数组
};


//运算符：+ - * / 加减乘除
points[1].x-points[0].x//=>1：更复杂的操作数也能照常工作
"3"+"2"//=>“32”:+可以完成假发运算也可以作为字符串链接
//运算符的简写方式
var count=0;//定义一个变量
count++;//自增1
count--;//自减1
count += 2;//自增2：和“count=count+2;”写法一样
count *= 3;//自乘3：和“count=count*3”写法一样
count//=>6：变量名本身也是一个表达式

//相等关系运算符用来判断两值是否相等
//不等、大于、小于运算符的运算结果是true或false
var x = 2,y = 3;//这里的 = 等号是赋值的意思，不是比较相等
x == y//=> false: 相等
x != y//=> true: 不等
x < y
x > y
x <= y
x >= y
"two" == "three"// => false：两个字符串不相等
"two" > "three"// => true: “tw”在字母表中的索引大于“th”
false == (x > y)// => true: false和false相等

//逻辑运算符是对布尔值的合并或求反
(x == 2) && (y == 3)// => true: 两个比较都是true,&&表示“与”
(x > 3) || (y < 3)// => false: 两个比较不都是true,||表示“或”
!(x == y)// => true：！求反


//函数是一段带有参数的JavaScript代码段，可以多次调用
function plus1(x){//定义了名为plus1的一个函数，带有参数x
	return x+1;//返回一个比传入的参数大的值
}//函数的代码块是由花括号包裹起来的部分
plus1(y)//=> 4：y为3，调用函数的结果为3+1

var square = function(x){//函数是一种值，可以赋值给变量
	return x*x;//计算函数的值
};//分好标识了赋值语句的结束
square(plus1(y))//=> 16：在一个表达式中调用两个函数

//当函数赋值给对象的属性，我们称为“方法”（method）
//所有的JavaScript对象都含有方法
var a = [];//创建一个空数组
a.push(1,2,3);//push()方法向数组中添加元素
a.reverse();//另一个方法：将数组元素的次序反转

//我们也可以定义自己的方法，“this”关键字是对定义方法的对象的引用
//这里的例子是上文中提到的包含两个点位置信息的数组
points.dist = function(){//定义一个方法用来计算两点之间的距离
	var p1 = this[0];//通过this获得对当前数组的引用
	var p2 = this[1];//并取得调用的数组前两个元素
	var a = p2.x - p1.x;//X坐标轴上的距离
	var b = p2.y - p1.y;//Y坐标轴上的距离
	return Math.sqrt(a*a+//勾股定理
		我们称为b*b);//用Math.sqrt()来计算平方根
};
points.dist()//=> 1.414：求得两个点之间的距离

//控制语句
//这些JavaScript语句使用该语法包含条件判断和循环
//使用了类似C、C++、Java和其他语言的语法
function abs(x){//求绝对值的函数
	if(x >= 0){//if语句
		return x;//如果比较结果为true则执行这里的代码。
	}//子句结束
	else{//当if条件不满足时执行else子句
		return - x;
	}//如果分支中只有一条语句，花括号可以省略
}//注意if.else中嵌套的return语句

function factorial(n){//计算阶乘的函数
	var product = 1;//给product赋值为1
	while(n > 1){//当()内的表达式为true时循环执行{}内的代码
		product *= n;//“product = product*n;”的简写形式
		n--;//“n =n - 1;”的简写形式
	}//循环结束
	return product;//返回product
}
factorial(4)//=>24:1*4*3*2
function factorial2(n){//实现循环的另一种写法
	var i,product = 1;//给product赋值为1
	for (i = 2;i <= n; i++)//将从2自增至n
		product *= i;//循环体，当循环体中只有一句代码，可以省略{}
	return product;//返回计算好的阶乘
}
factorial2(5)// => 120:1*2*3*4*5

//定义一个类类表示2D平面几何中的点。
//这个类实例化的对象拥有一个名为人（）的方法，用来激素三该点到原点的距离
//定义一个构造函数以初始化一个新的point对象
function Point(x,y){//按照惯例，构造函数均为大写字母开始
	this.x = x;//关键字this指代初始化的实例
	this.y = y;//将函数参数存储为对象的属性
}//不需要return

//使用new关键字和构造函数来创建一个实例
var p = new Point (1,1);//平面几何中的点（1,1）

//通过给构造函数的prototye对象赋值
//来给Point对象定义方法
Point.prototype.r = function(){
	return Math.sqrt(//返回x的立方+y的立方的平方根
		this.x * this.x +//this指代调用这个方法的对象
		this.y * this.y);
}

//Point的实例对象p（以及所有的Point实例对象）继承了方法r()
p.r()//=> 1.414


//在document中的饿一个指定的区域输出调试信息
//如果document不存在这样一个区域，则创建一个
function debug(msg){
	//通过查看HTML元素id属性来查找文档的调试部分
	var log = document.getElementById("debuglog");

	//如果这个元素不存在，则创建一个
	if (!log){
		log = document.createElement("div");//创建一个新的<div>元素
		log.id = "debuglog";//给这个元素的HTML id赋值
		log.innerHTML = "<h1>Debug Log</h1>";//定义初始内容
		document.body.appendChild(log);//将其添加到文档的末尾
	}

	//将消息包装在<pre>中，并添加至log中
	var pre = document.createElement("pre");//创建<pre>标签
	var text = document.createTextNode(msg);//将msg包装在一个文本节点中
	pre.appendChild(text);//将文本添加至<pre>
	log.appendChild(pre);//将<pre>添加至log
}

function hide(e,reflow){//通过JavaScript操纵样式来隐藏元素e
	if(reflow){//如果第二个参数是true
		e.style.display = "none"//隐藏这个元素，其所占的空间也随之消失
	}
	else{//否则
		e.style.visibility = "hidden";//将e隐藏，但是保留其所占的空间
	}
}
function highlight(e){//通过设置CSS类来高亮显示e
	//简单地定义或追加HTML类属性
	//这里假设CSS样式表中已经有“hilite”类的定义
	if(!e.className) e.className = "hilite";
	else e.className  += "hilite";
}