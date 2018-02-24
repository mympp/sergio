/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 *
 * 中文注释：Coco
 *
 * last-update: 2016-10-10
 */

// 写在前面：
// jQuery 源码有些方法的实现特别长且繁琐，因为 jQuery 本身作为一个通用性特别强的框架，
// 一个方法兼容了许多情况，也允许用户传入各种不同的参数，导致内部处理的逻辑十分复杂，
// 所以当解读一个方法的时候感觉到了明显的困难，尝试着跳出卡壳的那段代码本身，
// 站在更高的维度去思考这些复杂的逻辑是为了处理或兼容什么，为什么要这样写，一定会有不一样的收获
// 其次，也是因为这个原因，jQuery 源码存在许多兼容低版本的 HACK 或者逻辑十分晦涩繁琐的代码片段
// 浏览器兼容这样的大坑极其容易让一个前端工程师不能学到编程的精髓
// 所以不要太执着于一些边角料，即使兼容性很重要，也应该适度学习理解，适可而止

// 用一个函数域包起来，就是所谓的沙箱
// 在这里边 var 定义的变量，属于这个函数域内的局部变量，避免污染全局
// 把当前沙箱需要的外部变量通过函数参数引入进来
// 只要保证参数对内提供的接口的一致性，你还可以随意替换传进来的这个参数
// 为了不污染全局作用域，只在后面暴露 $ 和 jQuery 这 2 个变量给外界，尽量的避开变量冲突
(function(window, undefined) {

        // Can't do this because several apps including ASP.NET trace
        // the stack via arguments.caller.callee and Firefox dies if
        // you try to trace through "use strict" call chains. (#13335)
        // Support: Firefox 18+
        //"use strict";
        var
            // The deferred used on DOM ready
            // 一个用在 DOM ready 上的回调函数处理变量
            readyList,

            // A central reference to the root jQuery(document)
            // 所有 jQuery 对象最后的指向应该都是回到 jQuery(document)
            rootjQuery,

            // Support: IE<10
            // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
            // 将 undefined 转换为字符串 "undefined"
            core_strundefined = typeof undefined,

            // Use the correct document accordingly with window argument (sandbox)
            // 通过闭包函数传入的 window 对象，避免 document 之类的全局变量被其他插件修改
            location = window.location,
            document = window.document,
            docElem = document.documentElement,

            // Map over jQuery in case of overwrite
            // 设置别名，通过两个私有变量映射了 window 环境下的 jQuery 和 $ 两个对象，以防止变量被强行覆盖
            _jQuery = window.jQuery,

            // Map over the $ in case of overwrite
            // 设置别名，同上所述
            _$ = window.$,

            // [[Class]] -> type pairs
            // 储存了常见类型的 typeof 的哈希表
            // Boolean Number String Function Array Date RegExp Object Error
            // 其次，这里定义了一个空对象 {} ，如果下文行文需要调用对象的 toString 和 hasOwnProperty 方法
            // 将会调用 core_toString 和 core_hasOwn ，这两个变量事先存储好了这两个方法的入口
            // 节省查找内存地址时间，提高效率
            class2type = {},

            // 定义当前版本
            // 其次，这里定义了一个字符串对象 ，如果下文行文需要调用字符串对象的 trim 方法
            // 将会调用 core_trim ，这个变量事先存储好了 String.trim 方法的入口
            // 节省查找内存地址时间，提高效率
            core_version = "1.10.2",

            // List of deleted data cache ids, so we can reuse them
            // 其次，这里定义了一个空的数组对象 ，如果下文行文需要调用数组对象的 concat 、push 、slice 、indexOf 方法
            // 将会调用 core_concat 、core_push 、core_slice 、和 core_indexOf ，这四个变量事先存储好了这四个方法的入口
            // 节省查找内存地址时间，提高效率
            // 同时使用 call 或 apply 调用这些方法也可以使类数组也能用到数组的方法
            core_deletedIds = [],

            // Save a reference to some core methods
            // 定义这几个变量的作用如上所述
            // 存储了一些常用的核心方法
            core_concat = core_deletedIds.concat,
            core_push = core_deletedIds.push,
            core_slice = core_deletedIds.slice,
            core_indexOf = core_deletedIds.indexOf,
            core_toString = class2type.toString,
            core_hasOwn = class2type.hasOwnProperty,
            core_trim = core_version.trim,

            // Define a local copy of jQuery
            // 实例化 jQuery 对象 ,selector 是选择器，context 是上下文
            // 用法：$('#xxx') || $('<div></div>', { class: 'css-class', data-name: 'data-val' });
            jQuery = function(selector, context) {
                // The jQuery object is actually just the init constructor 'enhanced'
                // jQuery 没有使用 new 运算符将 jQuery 显示的实例化，而是直接调用其函数
                // 要实现这样,那么 jQuery 就要看成一个类，且返回一个正确的实例
                // 且实例还要能正确访问 jQuery 类原型上的属性与方法
                // 通过原型传递解决问题，把 jQuery 的原型传递给jQuery.prototype.init.prototype
                // jQuery.fn.init.prototype = jQuery.fn;
                // 所以通过这个方法生成的实例 this 所指向的 仍然是 jQuery.fn(jQuery.prototype)，所以能正确访问 jQuery 类原型上的属性与方法
                // http://rapheal.sinaapp.com/2013/01/31/jquery-src-obj/
                return new jQuery.fn.init(selector, context, rootjQuery);
            },

            // Used for matching numbers
            // 匹配数字
            // 第一个分组 (?:\d*\.|) 匹配 数字后面接一个小数点. 例如 123. 456. 或者空（注意正则最后的|）
            // 第二个分组 (?:[eE][+-]?\d+|) 匹配 e+10 或者 E-10 这样的指数表达式 或空
            // 需要注意的是 [+-]? 表示可匹配 +- 0 次或者 1 次，
            // (?:\d*\.|) 可匹配空
            // (?:[eE][+-]?\d+|) 可匹配空
            // 所以这个正则表达式的核心匹配是 /\d+/ 匹配数字一次或者多次
            core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

            // Used for splitting on whitespace
            // \S -- 匹配任意不是空白符的字符
            core_rnotwhite = /\S+/g,

            // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
            // 匹配头尾空格，确保去除 BOM 和 $nbsp;
            // | 分割的两部分是一样，分别匹配头尾的空格
            // 最快的trim方法请看：http://www.cnblogs.com/rubylouvre/archive/2009/09/18/1568794.html
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

            // A simple way to check for HTML strings
            // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
            // Strict HTML recognition (#11290: must start with <)
            // 一个简单的检测HTML字符串的表达式
            // 要看懂 jQuery 中的正则匹配，还必须深入理解 exec() 方法
            rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

            // Match a standalone tag
            // 这个正则匹配的是 纯HTML标签,不带任何属性 ，如 '<html></html>' 或者 '<img/>'
            // rsingleTag.test('<html></html>') --> true
            // rsingleTag.test('<img/>') --> true
            // rsingleTag.test('<div class="foo"></div>') --> false
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

            // JSON RegExp
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

            // Matches dashed string for camelizing
            // 匹配 -ms- 前缀
            rmsPrefix = /^-ms-/,

            // [\da-z] 表示任意英文字母或者数字
            rdashAlpha = /-([\da-z])/gi,

            // Used by jQuery.camelCase as callback to replace()
            // 在 jQuery.camelCase() 中会用到
            // 驼峰表示法，将 font-size 形式转化为 fontSize
            // function camelCase(string){
            //  return string.replace(/-([a-z])/g,function(all,letter){
            //      return letter.toUpperCase();
            //  })
            // }
            fcamelCase = function(all, letter) {
                return letter.toUpperCase();
            },

            // The ready event handler
            completed = function(event) {

                // readyState === "complete" is good enough for us to call the dom ready in oldIE
                if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
                    detach();
                    jQuery.ready();
                }
            },
            // Clean-up method for dom ready events
            detach = function() {
                if (document.addEventListener) {
                    document.removeEventListener("DOMContentLoaded", completed, false);
                    window.removeEventListener("load", completed, false);

                } else {
                    document.detachEvent("onreadystatechange", completed);
                    window.detachEvent("onload", completed);
                }
            };

        // 给 jQuery.prototype 设置别名 jQuery.fn
        // jQuery.prototype 即是 jQuery的原型，挂载在 jQuery.prototype 上的方法，即可让所有 jQuery 对象使用
        jQuery.fn = jQuery.prototype = {
            // The current version of jQuery being used
            // 当前版本
            jquery: core_version,

            // 构造函数
            // 相当于 jQuery.prototype.constructor = jQuery
            // 由于采用对象字面量的方式 jQuery.prototype = {} 重写了 jQuery.prototype
            // 如果不加上下面这句，jQuery.prototype.constructor 将指向 Object，
            // 为了严谨，可以在使用 jQuery.prototype = {} 重写整个 jQuery.prototype 的时候
            // 加上此句，手动让 jQuery.prototype.constructor 指回 jQuery
            // 如果采用 jQuery.prototype.init = function(){} 的方法一个一个新增原型方法
            // 则不需要添加下面这句， jQuery.prototype.constructor 默认指向 jQuery
            // 更为详细的原因可以看看高程3第六章
            constructor: jQuery,

            // 初始化方法
            // 即 构造jQuery对象实际上最后是调用这个方法(new jQuery.fn.init( selector, context, rootjQuery ) )
            // $('#xxx') -> new jQuery('#xxx')
            // 这个方法可以称作 jQuery对象构造器
            init: function(selector, context, rootjQuery) {
                var match, elem;

                // HANDLE: $(""), $(null), $(undefined), $(false)
                // 如果传入的参数为空，则直接返回this
                // 处理"",null,undefined,false,返回this ，增加程序的健壮性
                if (!selector) {
                    return this;
                }

                // Handle HTML strings
                // 处理字符串
                if (typeof selector === "string") {
                    // 下面这个 if 条件判断是先给 match 变量赋值
                    // if 条件相当于这个正则式 /^<\.+>$/
                    // 也就是以  "<"开始，">"结尾，且长度大于等于3 ，
                    // ex. <p> <html>
                    if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                        // Assume that strings that start and end with <> are HTML and skip the regex check
                        // 如果selector是html标签组成的话，match的组成直接如下
                        // match[1] = selecetor 即匹配的是 (<[\w\W]+>)
                        match = [null, selector, null];

                        // 并非是以  "<"开始，">"结尾
                    } else {
                        // 使用 exec 处理 selector ，得到数组match
                        // rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/ 简单的检测 HTML 字符串的表达式
                        match = rquickExpr.exec(selector);
                    }

                    // Match html or make sure no context is specified for #id
                    // 匹配的html或确保没有上下文指定为# id
                    if (match && (match[1] || !context)) {

                        // HANDLE: $(html) -> $(array)
                        // match[1] 为 true 的情况，是上面的这一句 match = [ null, selector, null ]
                        if (match[1]) {
                            // 传入上下文
                            context = context instanceof jQuery ? context[0] : context;

                            // scripts is true for back-compat
                            // 合并两个数组内容到第一个数组
                            // jQuery.parseHTML -> 使用原生的DOM元素的创建函数，将字符串转换为DOM元素数组，然后可以插入到文档中
                            jQuery.merge(this, jQuery.parseHTML(
                                match[1],
                                context && context.nodeType ? context.ownerDocument || context : document,
                                true
                            ));

                            // HANDLE: $(html, props)
                            // 这个 if 语句的作用是当 传入的selector 是纯 HTML 标签，且 context 不为空，相当于
                            // var jqHTML = $('<div></div>', { class: 'css-class', data-name: 'data-val' });
                            // console.log(jqHTML.attr('class')); //css-class
                            // console.log(jqHTML.attr('data-name')); //data-val
                            // rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
                            // 上面这个正则匹配的是 纯HTML标签,不带任何属性 ，如 '<html></html>' 或者 '<img/>'
                            // rsingleTag.test('<html></html>') --> true
                            // rsingleTag.test('<img/>') --> true
                            // rsingleTag.test('<div class="foo"></div>') --> false
                            // jQuery.isPlainObject 用于测试是否为纯粹的对象
                            // 纯粹的对象指的是 通过 "{}" 或者 "new Object" 创建的
                            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                                for (match in context) {
                                    // Properties of context are called as methods if possible
                                    if (jQuery.isFunction(this[match])) {
                                        this[match](context[match]);

                                        // ...and otherwise set as attributes
                                    } else {
                                        this.attr(match, context[match]);
                                    }
                                }
                            }

                            return this;

                            // HANDLE: $(#id)
                            // 处理id -> $('#id')
                            // 反之，match[1]为false 的情况下，是上面的 match = rquickExpr.exec( selector )
                        } else {
                            // match[2] 是匹配到的 id 名
                            elem = document.getElementById(match[2]);

                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            if (elem && elem.parentNode) {
                                // Handle the case where IE and Opera return items
                                // by name instead of ID
                                if (elem.id !== match[2]) {
                                    // 调用 Sizzle 引擎进行更复杂的选择器查找
                                    return rootjQuery.find(selector);
                                }

                                // Otherwise, we inject the element directly into the jQuery object
                                this.length = 1;
                                this[0] = elem;
                            }

                            this.context = document;
                            this.selector = selector;
                            return this;
                        }

                        // HANDLE: $(expr, $(...))
                        // 如果第一个参数是一个.className ，第二参数为一个选择器
                    } else if (!context || context.jquery) {
                        // rootjQuery 相当于 jQuery(document)
                        // 下面的 return 相当于 $(context).find( selector )
                        // (如果 context 为空) jQuery(document).find( selector )
                        // 调用 Sizzle 引擎进行更复杂的选择器查找
                        return (context || rootjQuery).find(selector);

                        // HANDLE: $(expr, context)
                        // (which is just equivalent to: $(context).find(expr)
                        // 如果第一个参数是.className，第二个参数是一个上下文对象
                        // 等同于处理$(.className .className)
                    } else {
                        // this.constructor 即是 jQuery
                        // this.constructor( context ).find( selector ) -> jQuery(context).find(selector)
                        // 调用 Sizzle 引擎进行更复杂的选择器查找
                        return this.constructor(context).find(selector);
                    }

                    // HANDLE: $(DOMElement)
                    // 处理DOMElement,返回修改过后的this
                } else if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;

                    // HANDLE: $(function)
                    // Shortcut for document ready
                    // 处理$(function(){})
                } else if (jQuery.isFunction(selector)) {
                    return rootjQuery.ready(selector);
                }

                // 匹配选择器里嵌套了一个选择器
                // $($('#container')) 相当于 $('#container')
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }

                return jQuery.makeArray(selector, this);
            },

            // Start with an empty selector
            selector: "",

            // The default length of a jQuery object is 0
            // jQuery 对象的默认长度为 0
            // jQuery 对象里边选取的DOM节点数目，有了这个属性就已经像“半个”数组了，:)
            length: 0,

            // 将 jQuery 对象转换成数组类型，这里返回的结果就真的是 Array 类型了
            // 相当于 Array.prototype.slice.call(this)
            // slice() 方法：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
            toArray: function() {
                return core_slice.call(this);
            },

            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            // 如果 num 不为 null ，将返回索引为 num 的元素
            // （否则）返回索引为 num 的 jQuery 对象
            // 当 num 为负数的时候，相当于从数组尾巴倒数索引
            get: function(num) {
                return num == null ?

                    // Return a 'clean' array
                    this.toArray() :

                    // Return just the object
                    // 负数即是可以反向选取
                    (num < 0 ? this[this.length + num] : this[num]);
            },

            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            // 将一个 DOM 元素集合加入到 jQuery 栈
            // 此方法在 jQuery 的 DOM 操作中被频繁的使用, 如在 parent(), find(), filter() 中
            // pushStack() 方法通过改变一个 jQuery 对象的 prevObject 属性来跟踪链式调用中前一个方法返回的 DOM 结果集合
            // 当我们在链式调用 end() 方法后, 内部就返回当前 jQuery 对象的 prevObject 属性
            pushStack: function(elems) {

                // Build a new jQuery matched element set
                // 构建一个新的jQuery对象，无参的 this.constructor()，只是返回引用 this
                // jQuery.merge 把 elems 节点，合并到新的 jQuery 对象
                // this.constructor 就是 jQuery 的构造函数 jQuery.fn.init，所以 this.constructor() 返回一个 jQuery 对象
                // 由于 jQuery.merge 函数返回的对象是第二个函数附加到第一个上面，所以 ret 也是一个 jQuery 对象，这里可以解释为什么 pushStack 出入的 DOM 对象也可以用 CSS 方法进行操作
                // 返回的对象的 prevObject 属性指向上一个对象，所以可以通过这个属性找到栈的上一个对象
                var ret = jQuery.merge(this.constructor(), elems);

                // Add the old object onto the stack (as a reference)
                // 给返回的新 jQuery 对象添加属性 prevObject
                // 所以也就是为什么通过 prevObject 能取到上一个合集的引用了
                ret.prevObject = this;
                ret.context = this.context;

                // Return the newly-formed element set
                return ret;
            },

            // Execute a callback for every element in the matched set.
            // (You can seed the arguments with an array of args, but this is
            // only used internally.)
            // 具体实现
            each: function(callback, args) {
                return jQuery.each(this, callback, args);
            },

            // 可以看出 ready 回调是绑定在 jQuery 的实例上的
            // $(document).ready(fn)
            // $("#id").ready(fn)
            // 都调用此处
            ready: function(fn) {
                // Add the callback
                // 这里的 jQuery.ready.promise() 返回异步队列
                // 调用异步队列的 done 方法，把 fn 回调加入成功队列里边去
                jQuery.ready.promise().done(fn);

                // 支持jQuery的链式操作
                return this;
            },

            // 构建一个新的jQuery对象数组，并可以回溯回上一个对象
            slice: function() {
                return this.pushStack(core_slice.apply(this, arguments));
            },

            // 取当前 jQuery 对象的第一个
            first: function() {
                return this.eq(0);
            },

            // 取当前 jQuery 对象的最后一个
            last: function() {
                return this.eq(-1);
            },

            // 取当前 jQuery 对象的第 i 个
            eq: function(i) {
                var len = this.length,
                    j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },

            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },

            // 回溯链式调用的上一个对象
            // $("#id").find('.clr').html('.clr HTML').end().html('#id HTML')
            // 本来 find 函数已经使得链的上下文切换到 .clr 这个 jQ 对象了，为了最后能回到 #id 这个 jQ 对象
            // 可以使用 end 方法来返回
            // 这里的秘籍就是每个对象里边的 prevObject 保存着链中的上一个 jQ 对象
            end: function() {
                // 回溯的关键是返回 prevObject 属性
                // 而 prevObject 属性保存了上一步操作的 jQuery 对象集合
                return this.prevObject || this.constructor(null);
            },

            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            // 仅在内部使用
            push: core_push,
            sort: [].sort,
            splice: [].splice
        };

        // Give the init function the jQuery prototype for later instantiation
        // jQuery 没有使用 new 运算符将 jQuery 显示的实例化，而是直接调用其函数
        // 要实现这样,那么 jQuery 就要看成一个类，且返回一个正确的实例
        // 且实例还要能正确访问 jQuery 类原型上的属性与方法
        // 通过原型传递解决问题，把 jQuery 的原型传递给jQuery.prototype.init.prototype
        // jQuery.fn.init.prototype = jQuery.fn;
        // 所以通过这个方法生成的实例 this 所指向的 仍然是 jQuery.fn(jQuery.prototype)，所以能正确访问 jQuery 类原型上的属性与方法
        jQuery.fn.init.prototype = jQuery.fn;

        // 扩展合并函数
        // 合并两个或更多对象的属性到第一个对象中，jQuery 后续的大部分功能都通过该函数扩展
        // 虽然实现方式一样，但是要注意区分用法的不一样，那么为什么两个方法指向同一个函数实现，但是却实现不同的功能呢,
        // 阅读源码就能发现这归功于 this 的强大力量
        // 如果传入两个或多个对象，所有对象的属性会被添加到第一个对象 target
        // 如果只传入一个对象，则将对象的属性添加到 jQuery 对象中，也就是添加静态方法
        // 用这种方式，我们可以为 jQuery 命名空间增加新的方法，可以用于编写 jQuery 插件
        // 如果不想改变传入的对象，可以传入一个空对象：$.extend({}, object1, object2);
        // 默认合并操作是不迭代的，即便 target 的某个属性是对象或属性，也会被完全覆盖而不是合并
        // 如果第一个参数是 true，则是深拷贝
        // 从 object 原型继承的属性会被拷贝，值为 undefined 的属性不会被拷贝
        // 因为性能原因，JavaScript 自带类型的属性不会合并
        jQuery.extend = jQuery.fn.extend = function() {
            var src, copyIsArray, copy, name, options, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            // target 是传入的第一个参数
            // 如果第一个参数是布尔类型，则表示是否要深递归，
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                // 如果传了类型为 boolean 的第一个参数，i 则从 2 开始
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            // 如果传入的第一个参数是 字符串或者其他
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }

            // extend jQuery itself if only one argument is passed
            // 如果参数的长度为 1 ，表示是 jQuery 静态方法
            if (length === i) {
                target = this;
                --i;
            }

            // 可以传入多个复制源
            // i 是从 1或2 开始的
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                // 将每个源的属性全部复制到 target 上
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        // src 是源（即本身）的值
                        // copy 是即将要复制过去的值
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        // 防止有环，例如 extend(true, target, {'target':target});
                        if (target === copy) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        // 这里是递归调用，最终都会到下面的 else if 分支
                        // jQuery.isPlainObject 用于测试是否为纯粹的对象
                        // 纯粹的对象指的是 通过 "{}" 或者 "new Object" 创建的
                        // 如果是深复制
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            // 数组
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];

                                // 对象
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            // 递归
                            target[name] = jQuery.extend(deep, clone, copy);

                            // Don't bring in undefined values
                            // 最终都会到这条分支
                            // 简单的值覆盖
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            // 返回新的 target
            // 如果 i < length ，是直接返回没经过处理的 target，也就是 arguments[0]
            // 也就是如果不传需要覆盖的源，调用 $.extend 其实是增加 jQuery 的静态方法
            return target;
        };

        // 一些工具函数，区分 jQuery.extend(object) 和 jQuery.fn.extend(object) 区别
        // jQuery.extend(object) 为扩展 jQuery 类本身，为类添加新的方法。
        // jQuery.fn.extend(object) 给 jQuery 对象添加方法
        jQuery.extend({
                // Unique for each copy of jQuery on the page
                // Non-digits removed to match rinlinejQuery
                // 产生jQuery随机数 类似于： "jQuery044958585570566356"
                expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),

                // noConflict() 方法让出变量 $ 的 jQuery 控制权，这样其他脚本就可以使用它了
                // 通过全名替代简写的方式来使用 jQuery
                // deep -- 布尔值。指示是否允许彻底将 jQuery 变量还原(移交 $ 引用的同时是否移交 jQuery 对象本身)
                // 让出 jQuery $ 的控制权不代表不能在 jQuery 使用 $ ，方法如下 （）
                //
                //  var query = jQuery.noConflict(true);
                //
                // (function($) {
                //
                //     // 插件或其他形式的代码，也可以将参数设为 jQuery
                //  })(query);
                //
                //  ... 其他用 $ 作为别名的库的代码
                //
                noConflict: function(deep) {
                    // 判断全局 $ 变量是否等于 jQuery 变量
                    // 如果等于，则重新还原全局变量 $ 为 jQuery 运行之前的变量（存储在内部变量 _$ 中）
                    if (window.$ === jQuery) {
                        // 此时 jQuery 别名 $ 失效
                        window.$ = _$;
                    }
                    // 当开启深度冲突处理并且全局变量 jQuery 等于内部 jQuery，则把全局 jQuery 还原成之前的状况
                    if (deep && window.jQuery === jQuery) {
                        // 如果 deep 为 true，此时 jQuery 失效
                        window.jQuery = _jQuery;
                    }

                    // 这里返回的是 jQuery 库内部的 jQuery 构造函数（new jQuery.fn.init()）
                    // 像使用 $ 一样尽情使用它吧
                    return jQuery;
                },

                // Is the DOM ready to be used? Set to true once it occurs.
                // DOM ready 是否已经完成
                isReady: false,

                // A counter to track how many items to wait for before
                // the ready event fires. See #6781
                // 控制有多少个 holdReady 事件需要在 Dom ready 之前执行
                readyWait: 1,

                // Hold (or release) the ready event
                // 方法允许调用者延迟 jQuery 的 ready 事件
                // example. 延迟就绪事件，直到已加载的插件。
                //
                // $.holdReady(true);
                // $.getScript("myplugin.js", function() {
                //   $.holdReady(false);
                // });
                //
                holdReady: function(hold) {
                    if (hold) {
                        jQuery.readyWait++;
                    } else {
                        jQuery.ready(true);
                    }
                },

                // Handle when the DOM is ready
                ready: function(wait) {

                    // Abort if there are pending holds or we're already ready
                    // 如果需要等待，holdReady()的时候，把hold住的次数减1，如果还没到达0，说明还需要继续hold住，return掉
                    // 如果不需要等待，判断是否已经Ready过了，如果已经ready过了，就不需要处理了。异步队列里边的done的回调都会执行了
                    if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                        return;
                    }

                    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                    // 确定 body 存在
                    if (!document.body) {
                        // 如果 body 还不存在 ，DOMContentLoaded 未完成，此时
                        // 将 jQuery.ready 放入定时器 setTimeout 中
                        // 不带时间参数的 setTimeout(a) 相当于 setTimeout(a,0)
                        // 但是这里并不是立即触发 jQuery.ready
                        // 由于 javascript 的单线程的异步模式
                        // setTimeout(jQuery.ready) 会等到重绘完成才执行代码，也就是 DOMContentLoaded 之后才执行 jQuery.ready
                        // 所以这里有个小技巧：在 setTimeout 中触发的函数, 一定会在 DOM 准备完毕后触发
                        return setTimeout(jQuery.ready);
                    }

                    // Remember that the DOM is ready
                    // 记录 DOM ready 已经完成
                    jQuery.isReady = true;

                    // If a normal DOM Ready event fired, decrement, and wait if need be
                    // wait 为 false 表示ready事情未触发过，否则 return
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }

                    // If there are functions bound, to execute
                    // 调用异步队列，然后派发成功事件出去（最后使用done接收，把上下文切换成document，默认第一个参数是jQuery。
                    readyList.resolveWith(document, [jQuery]);

                    // Trigger any bound ready events
                    // 最后jQuery还可以触发自己的ready事件
                    // 例如：
                    //    $(document).on('ready', fn2);
                    //    $(document).ready(fn1);
                    // 这里的fn1会先执行，自己的ready事件绑定的fn2回调后执行
                    if (jQuery.fn.trigger) {
                        jQuery(document).trigger("ready").off("ready");
                    }
                },

                // See test/unit/core.js for details concerning isFunction.
                // Since version 1.3, DOM methods and functions like alert
                // aren't supported. They return false on IE (#2968).
                // 判断传入对象是否为 function
                isFunction: function(obj) {
                    return jQuery.type(obj) === "function";
                },
                // 判断传入对象是否为数组
                isArray: Array.isArray || function(obj) {
                    return jQuery.type(obj) === "array";
                },
                // 判断传入对象是否为 window 对象
                isWindow: function(obj) {
                    /* jshint eqeqeq: false */
                    return obj != null && obj == obj.window;
                },
                // 确定它的参数是否是一个数字
                isNumeric: function(obj) {
                    return !isNaN(parseFloat(obj)) && isFinite(obj);
                },

                // 确定JavaScript 对象的类型
                // 这个方法的关键之处在于 class2type[core_toString.call(obj)]
                // 可以使得 typeof obj 为 "object" 类型的得到更进一步的精确判断
                type: function(obj) {
                    // 如果传入的为 null --> $.type(null)
                    // "null"
                    if (obj == null) {
                        return String(obj);
                    }
                    // 利用事先存好的 hash 表 class2type 作精准判断
                    return typeof obj === "object" || typeof obj === "function" ?
                        class2type[core_toString.call(obj)] || "object" :
                        typeof obj;
                },
                // 测试对象是否是纯粹的对象
                // 通过 "{}" 或者 "new Object" 创建的
                isPlainObject: function(obj) {
                    var key;

                    // Must be an Object.
                    // Because of IE, we also have to check the presence of the constructor property.
                    // Make sure that DOM nodes and window objects don't pass through, as well
                    if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                        return false;
                    }

                    try {
                        // Not own constructor property must be Object
                        if (obj.constructor &&
                            !core_hasOwn.call(obj, "constructor") &&
                            !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                            return false;
                        }
                    } catch (e) {
                        // IE8,9 Will throw exceptions on certain host objects #9897
                        return false;
                    }

                    // Support: IE<9
                    // Handle iteration over inherited properties before own properties.
                    if (jQuery.support.ownLast) {
                        for (key in obj) {
                            return core_hasOwn.call(obj, key);
                        }
                    }

                    // Own properties are enumerated firstly, so to speed up,
                    // if last one is own, then all properties are own.
                    for (key in obj) {}

                    return key === undefined || core_hasOwn.call(obj, key);
                },
                // 检查对象是否为空（不包含任何属性）
                isEmptyObject: function(obj) {
                    var name;
                    for (name in obj) {
                        return false;
                    }
                    return true;
                },
                // 为 JavaScript 的 "error" 事件绑定一个处理函数
                error: function(msg) {
                    throw new Error(msg);
                },
                // data: string of html
                // context (optional): If specified, the fragment will be created in this context, defaults to document
                // keepScripts (optional): If true, will include scripts passed in the html string
                // 将字符串解析到一个 DOM 节点的数组中
                // data -- 用来解析的HTML字符串
                // context -- DOM元素的上下文，在这个上下文中将创建的HTML片段
                // keepScripts  -- 一个布尔值，表明是否在传递的HTML字符串中包含脚本
                parseHTML: function(data, context, keepScripts) {
                    // 传入的 data 不是字符串，返回 null
                    if (!data || typeof data !== "string") {
                        return null;
                    }

                    // 如果没有传上下文参数
                    // function(data,keepScripts)
                    if (typeof context === "boolean") {
                        keepScripts = context;
                        context = false;
                    }

                    // 如果没有传上下文参数 , 将上下文参数置为 document
                    context = context || document;

                    // rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
                    // 上面这个正则匹配的是 纯HTML标签,不带任何属性 ，如 '<html></html>' 或者 '<img/>'
                    // rsingleTag.test('<html></html>') --> true
                    // rsingleTag.test('<img/>') --> true
                    // rsingleTag.test('<div class="foo"></div>') --> false
                    var parsed = rsingleTag.exec(data),
                        scripts = !keepScripts && [];
                    // 这里相当于
                    // if(!keepScripts){
                    //   scripts = [];
                    // }else{
                    //   scripts = !keepScripts;
                    // }

                    // Single tag
                    // 单个标签，如果捕获的 div 相当于
                    // return document.createElement('div');
                    if (parsed) {
                        return [context.createElement(parsed[1])];
                    }

                    parsed = jQuery.buildFragment([data], context, scripts);
                    if (scripts) {
                        jQuery(scripts).remove();
                    }
                    return jQuery.merge([], parsed.childNodes);
                },

                // 解析 JSON 字符串
                parseJSON: function(data) {
                    // Attempt to parse using the native JSON parser first
                    if (window.JSON && window.JSON.parse) {
                        return window.JSON.parse(data);
                    }

                    if (data === null) {
                        return data;
                    }

                    if (typeof data === "string") {

                        // Make sure leading/trailing whitespace is removed (IE can't handle it)
                        data = jQuery.trim(data);

                        if (data) {
                            // Make sure the incoming data is actual JSON
                            // Logic borrowed from http://json.org/json2.js
                            if (rvalidchars.test(data.replace(rvalidescape, "@")
                                    .replace(rvalidtokens, "]")
                                    .replace(rvalidbraces, ""))) {

                                return (new Function("return " + data))();
                            }
                        }
                    }

                    jQuery.error("Invalid JSON: " + data);
                },

                // Cross-browser xml parsing
                parseXML: function(data) {
                    var xml, tmp;
                    if (!data || typeof data !== "string") {
                        return null;
                    }
                    try {
                        if (window.DOMParser) { // Standard
                            tmp = new DOMParser();
                            xml = tmp.parseFromString(data, "text/xml");
                        } else { // IE
                            xml = new ActiveXObject("Microsoft.XMLDOM");
                            xml.async = "false";
                            xml.loadXML(data);
                        }
                    } catch (e) {
                        xml = undefined;
                    }
                    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                        jQuery.error("Invalid XML: " + data);
                    }
                    return xml;
                },

                noop: function() {},

                // Evaluates a script in a global context
                // Workarounds based on findings by Jim Driscoll
                // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
                // 一个 eval 的变种（eval()：函数可计算某个字符串，并执行其中的的 JavaScript 代码）
                // globalEval()函数用于全局性地执行一段JavaScript代码
                // 该方法跟eval方法相比有一个作用域的范围差异即始终处于全局作用域下面
                globalEval: function(data) {
                    // 如果 data 不为空
                    if (data && jQuery.trim(data)) {
                        // We use execScript on Internet Explorer
                        // We use an anonymous function so that context is window
                        // rather than jQuery in Firefox
                        // 如果 window.execScript 存在，则直接 window.execScript(data)
                        // window.execScript 方法会根据提供的脚本语言执行一段脚本代码
                        // 现在是在IE跟旧版本的Chrome是支持此方法的，新版浏览器没有 window.execScript 这个API
                        (window.execScript || function(data) {
                            // 这里为何不能直接：eval.call( window, data );
                            // 在chrome一些旧版本里eval.call( window, data )无效
                            window["eval"].call(window, data);
                        })(data);
                    }
                },

                // Convert dashed to camelCase; used by the css and data modules
                // Microsoft forgot to hump their vendor prefix (#9572)
                // 驼峰表示法 例如将 font-size 变为 fontSize
                // 在很多需要兼容 IE 的地方用得上，例如 IE678 获取 CSS 样式的时候，使用
                // element.currentStyle.getAttribute(camelCase(style)) 传入的参数必须是驼峰表示法
                camelCase: function(string) {
                    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
                },

                // 获取 DOM 节点的节点名字或者判断其名字跟传入参数是否匹配
                nodeName: function(elem, name) {
                    // IE下，DOM节点的nodeName是大写的，例如DIV
                    // 所以统一转成小写再判断
                    // 这里不return elem.nodeName.toLowerCase();
                    // 我认为原因是为了保持浏览器自身的对外的规则，避免所有引用nodeName都要做转换的动作
                    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
                    // return a && b; 等同于
                    // if(a){
                    //      return b;
                    // }else{
                    //    return a;
                    // }
                },

                // args is for internal usage only
                // 遍历一个数组或者对象
                // obj 是需要遍历的数组或者对象
                // callback 是处理数组/对象的每个元素的回调函数，它的返回值实际会中断循环的过程
                // args 是额外的参数数组
                each: function(obj, callback, args) {
                    var value,
                        i = 0,
                        length = obj.length,
                        isArray = isArraylike(obj); // 判断是不是数组

                    // 传了第三个参数
                    if (args) {
                        if (isArray) {
                            for (; i < length; i++) {
                                // 相当于:
                                // args = [arg1, arg2, arg3];
                                // callback(args1, args2, args3)。然后callback里边的this指向了obj[i]
                                value = callback.apply(obj[i], args);

                                if (value === false) {
                                    // 注意到，当callback函数返回值会false的时候，注意是全等！循环结束
                                    break;
                                }
                            }
                            // 非数组
                        } else {
                            for (i in obj) {
                                value = callback.apply(obj[i], args);

                                if (value === false) {
                                    break;
                                }
                            }
                        }

                        // A special, fast, case for the most common use of each
                    } else {
                        // 数组
                        // 其实这里代码有点赘余，如果考虑代码的简洁性牺牲一点点性能
                        // 在处理数组的情况下，也是可以用 for(i in obj)的
                        if (isArray) {
                            for (; i < length; i++) {
                                // 相当于callback(i, obj[i])。然后callback里边的this指向了obj[i]
                                value = callback.call(obj[i], i, obj[i]);

                                if (value === false) {
                                    break;
                                }
                            }
                            // 非数组
                        } else {
                            for (i in obj) {
                                value = callback.call(obj[i], i, obj[i]);

                                if (value === false) {
                                    break;
                                }
                            }
                        }
                    }

                    return obj;
                },

                // Use native String.trim function wherever possible
                // 去除字符串两端空格
                // core_trim = core_version.trim,
                // rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
                // \uFEFF 是 utf8 的字节序标记，详见：字节顺序标记 https://zh.wikipedia.org/wiki/%E4%BD%8D%E5%85%83%E7%B5%84%E9%A0%86%E5%BA%8F%E8%A8%98%E8%99%9F
                // \xA0 是全角空格
                trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
                    // 如果已经支持原生的 String 的 trim 方法
                    // 相当于等于下面这个方法 $.trim = function( text ) {...}
                    function(text) {
                        return text == null ?
                            "" :
                            core_trim.call(text);
                    } :

                    // Otherwise use our own trimming functionality
                    // 不支持原生的 String 的 trim 方法
                    function(text) {
                        return text == null ?
                            "" :
                            // text + "" 强制类型转换 ，转换为 String 类型
                            (text + "").replace(rtrim, "");
                    },

                // results is for internal usage only
                // 将类数组对象转换为数组对象
                // 此方法为内部方法
                makeArray: function(arr, results) {
                    var ret = results || [];

                    if (arr != null) {
                        // 如果 arr 是一个类数组对象，调用 merge 合到返回值
                        if (isArraylike(Object(arr))) {
                            jQuery.merge(ret,
                                typeof arr === "string" ?
                                [arr] : arr
                            );
                        } else {
                            // 如果不是数组，则将其放到返回数组末尾
                            // 等同于 ret.push(arr);
                            core_push.call(ret, arr);
                        }
                    }

                    return ret;
                },

                // 在数组中查找指定值并返回它的索引（如果没有找到，则返回-1）
                // elem 规定需检索的值。
                // arr 数组
                // i 可选的整数参数。规定在数组中开始检索的位置。它的合法取值是 0 到 arr.length - 1。如省略该参数，则将从数组首元素开始检索。
                inArray: function(elem, arr, i) {
                    var len;

                    if (arr) {
                        // 如果支持原生的 indexOf 方法，直接调用
                        // core_indexOf.call( arr, elem, i ) 相当于：
                        // Array.indexOf.call(arr,elem, i)
                        if (core_indexOf) {
                            return core_indexOf.call(arr, elem, i);
                        }

                        len = arr.length;
                        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                        for (; i < len; i++) {
                            // Skip accessing in sparse arrays
                            // jQuery这里的(i in arr)判断是为了跳过稀疏数组中的元素
                            // 例如 var arr = []; arr[1] = 1;
                            // 此时 arr == [undefined, 1]
                            // 结果是 => (0 in arr == false) (1 in arr == true)
                            // 测试了一下 $.inArray(undefined, arr, 0)是返回 -1 的
                            if (i in arr && arr[i] === elem) {
                                return i;
                            }
                        }
                    }

                    return -1;
                },

                // merge的两个参数必须为数组，作用就是修改第一个数组，使得它末尾加上第二个数组
                merge: function(first, second) {
                    var l = second.length,
                        i = first.length,
                        j = 0;

                    if (typeof l === "number") {
                        for (; j < l; j++) {
                            first[i++] = second[j];
                        }
                    } else {
                        while (second[j] !== undefined) {
                            first[i++] = second[j++];
                        }
                    }

                    first.length = i;

                    return first;
                },
                // 查找满足过滤函数的数组元素,原始数组不受影响
                // elems 是传入的数组，callback 是过滤器，inv 为 true 则返回那些被过滤掉的值
                grep: function(elems, callback, inv) {
                    var retVal,
                        ret = [],
                        i = 0,
                        length = elems.length;
                    // !! 强制类型转换为 boolean 值
                    inv = !!inv;

                    // Go through the array, only saving the items
                    // that pass the validator function
                    for (; i < length; i++) {
                        // !! 强制类型转换为 boolean 值
                        // 注意这里的 callback 参数是先 value,后 key
                        if (inv !== retVal) {
                            retVal = !!callback(elems[i], i);
                            if (inv !== retVal) {
                                ret.push(elems[i]);
                            }
                        }

                        return ret;
                    },

                    // arg is for internal usage only
                    // 把数组每一项经过callback处理后的值依次加入到返回数组中
                    map: function(elems, callback, arg) {
                            var value,
                                i = 0,
                                length = elems.length,
                                isArray = isArraylike(elems),
                                ret = [];

                            // Go through the array, translating each of the items to their
                            // 如果传入的 elems 是数组
                            if (isArray) {
                                for (; i < length; i++) {
                                    value = callback(elems[i], i, arg);

                                    if (value != null) {
                                        ret[ret.length] = value;
                                    }
                                }

                                // Go through every key on the object,
                                // 如果传入的 elems 是对象
                            } else {
                                for (i in elems) {
                                    value = callback(elems[i], i, arg);

                                    if (value != null) {
                                        ret[ret.length] = value;
                                    }
                                }
                            }

                            // Flatten any nested arrays
                            // 这里相当于 var a = [];a.concat(ret)
                            return core_concat.apply([], ret);
                        },

                        // A global GUID counter for objects
                        // 一个全局的计数器
                        guid: 1,

                        // Bind a function to a context, optionally partially applying any
                        // arguments.
                        // 接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文语境
                        // fn -- 将要改变上下文语境的函数
                        // context -- 函数的上下文语境( this )会被设置成这个 object 对象
                        proxy: function(fn, context) {
                            var args, proxy, tmp;

                            if (typeof context === "string") {
                                tmp = fn[context];
                                context = fn;
                                fn = tmp;
                            }

                            // Quick check to determine if target is callable, in the spec
                            // this throws a TypeError, but we will just return undefined.
                            if (!jQuery.isFunction(fn)) {
                                return undefined;
                            }

                            // Simulated bind
                            // 将参数转化为数组
                            args = core_slice.call(arguments, 2);
                            proxy = function() {
                                return fn.apply(context || this, args.concat(core_slice.call(arguments)));
                            };

                            // Set the guid of unique handler to the same of original handler, so it can be removed
                            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

                            return proxy;
                        },

                        // Multifunctional method to get and set values of a collection
                        // The value/s can optionally be executed if it's a function
                        // access 函数只在内部 $.fn.attr 和 $.fn.css 方法中用到
                        // example:
                        // $('#test').height(100).width(100).css('color', 'red') 或者 $('#test').attr('class','cls1') -- 都会调用 $.access()
                        // 这是一个重载方法，根据传入的参数不同，作用不同
                    // @param elems 元素的集合[collection]，[类]数组
                    // @param fn 函数
                    // @param key 属性
                    // @param value 值
                    // @param chainable 是否可以链式调用，如果是 get 动作，为 false，如果是 set 动作，为 true
                    //   对于 get 类方法，我们会获得一个返回值，例如字符串、数字等等，这时候是不需要链式执行的，而对于 set 类方法，通常需要如此
                    // @param emptyGet 如果 jQuery 没有选中到元素的返回值
                    // @param raw value 是否为原始数据，如果 raw 是 true，说明 value 是原始数据，如果是 false，说明 raw 是个函数
                    // @returns {*}
                        access: function(elems, fn, key, value, chainable, emptyGet, raw) {
                            var i = 0,
                                // 元素的集合[collection]，[类]数组
                                length = elems.length,
                                bulk = key == null;

                            // Sets many values
                            // 如果参数 key 是对象，表示要设置多个属性，则遍历参数 key，遍历调用 access 方法
                            // example:
                            // $('#div').attr({data:1,def:'addd'});
                            if (jQuery.type(key) === "object") {
                                // 设置属性，支持链式调用
                                chainable = true;
                                for (i in key) {
                                    jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
                                }

                            // Sets one value
                            // 设置单个属性
                            // example:
                            // $('#box').attr('customvalue','abc')
                // $('#box').attr('customvalue',function (value) {});
                            } else if (value !== undefined) {
                                // 设置属性，支持链式调用
                                chainable = true;

                                if (!jQuery.isFunction(value)) {
                                    raw = true;
                                }

                                // 相当于
                                // if (key == null && value !== undefined)
                                if (bulk) {
                                    // Bulk operations run against the entire set
                                    if (raw) {
                                        fn.call(elems, value);
                                        fn = null;

                                    // ...except when executing function values
                                    // 如果key有值的话，这里的 bulk 是为了节省一个变量，将 fn 用 bulk 存起来，然后封装 fn 的调用
                                    } else {
                                        bulk = fn;
                                        fn = function(elem, key, value) {
                                            return bulk.call(jQuery(elem), value);
                                        };
                                    }
                                }

                                // 如果 fn 存在，掉调用每一个元素，无论 key 是否有值，都会走到这个判断，执行 set 动作
                                if (fn) {
                                    for (; i < length; i++) {

                                    // 如果 value 是原始数据，就取 value，如果是个函数，就调用这个函数取值
                    // $('#box').attr('abc',function (index,value) { });
                    // index 指向当前元素的索引,value 指向 oldValue
                    // 先调用 jQuery.attr(elements[i],key) 取到当前的值，然后调用传入的fn值
                                        fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                                    }
                                }
                            }

                     // 如果 chainable 为 true，说明是个 set 方法，就返回 elems
                     // 否则说明是 get 方法
                     // 1.如果 bulk 是个 true，说明没有 key 值，调用 fn，将 elems 传进去
                     // 2.如果 bulk 是个 false，说明 key 有值，然后判断元素的长度是否大于 0
                     //    2.1 如果大于 0，调用 fn，传入 elems[0] 和 key ，完成 get
                     //    2.2 如果为 0，说明传参有问题，返回指定的空值 emptyGet
                            return chainable ?
                                elems :

                                // Gets
                                bulk ?
                                fn.call(elems) :
                                length ? fn(elems[0], key) : emptyGet;
                        },

                        // 获取当前时间
                        now: function() {
                            return (new Date()).getTime();
                        },

                        // A method for quickly swapping in/out CSS properties to get correct calculations.
                        // Note: this method belongs to the css module but it's needed here for the support module.
                        // If support gets modularized, this method should be moved back to the css module.
                        // 此方法是属于 css 模块
                        swap: function(elem, options, callback, args) {
                            var ret, name,
                                old = {};

                            // Remember the old values, and insert the new ones
                            for (name in options) {
                                old[name] = elem.style[name];
                                elem.style[name] = options[name];
                            }

                            ret = callback.apply(elem, args || []);

                            // Revert the old values
                            // 还原旧数据
                            for (name in options) {
                                elem.style[name] = old[name];
                            }

                            return ret;
                        }
                });

            // $.ready()
            jQuery.ready.promise = function(obj) {
                if (!readyList) {

                    // 如果没有，新建一个 Deferred 对象
                    // Deferred 用于处理异步延时回调函数，也就是内部用于 ready 的一个异步队列
                    readyList = jQuery.Deferred();

                    // Catch cases where $(document).ready() is called after the browser event has already occurred.
                    // we once tried to use readyState "interactive" here, but it caused issues like the one
                    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
                    if (document.readyState === "complete") {
                        // Handle it asynchronously to allow scripts the opportunity to delay ready
                        // setTimeout : 在setTimeout中触发的函数, 一定会在DOM准备完毕后触发.(即是 DOMContentLoaded)
                        setTimeout(jQuery.ready);

                        // Standards-based browsers support DOMContentLoaded
                        // 支持 DOMContentLoaded 的浏览器 （除去ie 6 7 8）
                    } else if (document.addEventListener) {
                        // Use the handy event callback
                        // 当检测的 document.readyState 的值不为 complete 时， 用 readystatechange 监听 document.readyState 值的变化事件
                        document.addEventListener("DOMContentLoaded", completed, false);

                        // A fallback to window.onload, that will always work
                        // 一种退而求其次的方法，确保一定会发生
                        window.addEventListener("load", completed, false);

                        // If IE event model is used
                        // 如果是 IE 浏览器（6、7、8）
                    } else {
                        // Ensure firing before onload, maybe late but safe also for iframes
                        document.attachEvent("onreadystatechange", completed);

                        // A fallback to window.onload, that will always work
                        window.attachEvent("onload", completed);

                        // If IE and not a frame
                        // continually check to see if the document is ready
                        // 如果是 IE 且不是在 frame 中
                        var top = false;

                        try {
                            top = window.frameElement == null && document.documentElement;
                        } catch (e) {}

                        // 如果是IE并且不是iframe
                        if (top && top.doScroll) {
                            // 这里有个立即执行函数 doScrollCheck()
                            (function doScrollCheck() {
                                if (!jQuery.isReady) {

                                    try {
                                        // Use the trick by Diego Perini
                                        // http://javascript.nwbox.com/IEContentLoaded/
                                        // Diego Perini 在 2007 年的时候，报告了一种检测 IE 是否加载完成的方式，使用 doScroll 方法调用
                                        // 原理就是对于 IE 在非 iframe 内时，只有不断地通过能否执行 doScroll 判断 DOM 是否加载完毕
                                        // 在上述中间隔 50 毫秒尝试去执行 doScroll，注意，由于页面没有加载完成的时候，调用 doScroll 会导致异常，所以使用了 try - catch 来捕获异常
                                        // 直到DOM渲染结束了，这个时候 doScroll 方法不会抛出异常，然后就调用$.ready()
                                        top.doScroll("left");
                                    } catch (e) {
                                        return setTimeout(doScrollCheck, 50);
                                    }

                                    // detach all dom ready events
                                    detach();

                                    // and execute any waiting functions
                                    jQuery.ready();
                                }
                            })();
                        }
                    }
                }
                // 函数返回的是deferred对象，这就可以加上链式操作了
                // 可以使用 .done .fail 等方法
                return readyList.promise(obj);

                // Populate the class2type map
            };
            // typeof 并不能区分出它是 Array 、RegExp 等 object 类型，jQuery 为了扩展 typeof 的表达力，因此有了 $.type 方法
            // 针对一些特殊的对象（例如 null，Array，RegExp）也进行精准的类型判断
            // 运用了钩子机制，判断类型前，将常见类型打表，先存于一个 Hash 表 class2type 里边
            jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
                class2type["[object " + name + "]"] = name.toLowerCase();
            });

            // 返回对象是否是类数组对象
            function isArraylike(obj) {
                var length = obj.length,
                    type = jQuery.type(obj);

                if (jQuery.isWindow(obj)) {
                    return false;
                }

                if (obj.nodeType === 1 && length) {
                    return true;
                }

                return type === "array" || type !== "function" &&
                    (length === 0 ||
                        typeof length === "number" && length > 0 && (length - 1) in obj);
            }

            // All jQuery objects should point back to these
            // 所有jQuery 对象最后的指向应该都是回到 jQuery(document)
            // 此对象为 document 的 jQuery 对象，所有的 jQuery 对象最终都将指向它
            // 可以在chrome dev tools中观察 prevObject
            rootjQuery = jQuery(document);


            /*!
             * Sizzle CSS Selector Engine v1.10.2
             * http://sizzlejs.com/
             *
             * Copyright 2013 jQuery Foundation, Inc. and other contributors
             * Released under the MIT license
             * http://jquery.org/license
             *
             * Date: 2013-07-03
             */
            // 下面一长篇开始将是 Sizzle 引擎
            (function(window, undefined) {

                // 一些变量，下文会用到，可以先初略了解
                // support -- 用于检测浏览器对一些原生方法是否支持（ document.getElementsByClassName 这些）
                // cachedruns --
                // Expr -- 记录跟选择器相关的属性以及操作
                // getText --
                // isXML -- 是否是XML
                // compile -- 编译函数机制
                // outermostContext -- 最大的上下文环境
                // sortInput --
                var i,
                    support,
                    cachedruns,
                    Expr,
                    getText,
                    isXML,
                    compile,
                    outermostContext,
                    sortInput,

                    // Local document vars
                    setDocument,
                    document,
                    docElem,
                    documentIsHTML,
                    rbuggyQSA,
                    rbuggyMatches,
                    matches,
                    contains,

                    // Instance-specific data
                    // 用来对特殊的函数进行标记
                    expando = "sizzle" + -(new Date()),
                    // 保存复用的 document 变量，提高效率
                    preferredDoc = window.document,
                    dirruns = 0,
                    done = 0,

                    // 这里定义了 3 个缓存函数
                    // 使用方法：
                    // 通过 classCache(key, value) 的形式进行存储
                    // 通过 classCache[key+ ' '] 来进行获取
                    classCache = createCache(),
                    tokenCache = createCache(),
                    compilerCache = createCache(),

                    // 刚检查完的两个元素是否重复
                    hasDuplicate = false,
                    sortOrder = function(a, b) {
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        return 0;
                    },

                    // General-purpose constants
                    // typeof undefined --> "undefined"
                    // 将 undefined 类型转换为字符串，用于判断
                    strundefined = typeof undefined,
                    MAX_NEGATIVE = 1 << 31,

                    // Instance methods
                    // 定义一些常用方法的入口（后面使用 apply 或者 call 调用）
                    hasOwn = ({}).hasOwnProperty,
                    arr = [],
                    // 分别缓存了数组的 pop 、push 、silce 方法
                    pop = arr.pop,
                    push_native = arr.push,
                    push = arr.push,
                    slice = arr.slice,

                    // Use a stripped-down indexOf if we can't use a native one
                    // 定义一个 indexOf 方法（如果原生浏览器支持则使用原生的）
                    indexOf = arr.indexOf || function(elem) {
                        var i = 0,
                            len = this.length;
                        for (; i < len; i++) {
                            if (this[i] === elem) {
                                return i;
                            }
                        }
                        return -1;
                    },

                    // 用来在做属性选择的时候进行判断
                    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                    // Regular expressions
                    // 下面是一些正则表达式（或正则表达式片段）

                    // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                    // 空白符正则
                    // \t 制表符；\r 回车；\n 换行；\f 换页；
                    // \xnn 由十六进制数nn指定的拉丁字符 -->  \uxxxx 由十六进制数xxxx指定的Unicode字符,
                    // \x20 化为二进制数为 0010 0000 ,对照表格  http://ascii.911cha.com/ ，表示空格
                    whitespace = "[\\x20\\t\\r\\n\\f]",
                    // http://www.w3.org/TR/css3-syntax/#characters
                    // 一段正则规则（这里并非完整的正则表达式，只是一段）
                    // 匹配符合 css 命名的字符串
                    // \\\\. 转换到正则表达式中就是 \\.+ 用来兼容带斜杠的 css
                    // 三种匹配字符的方式：\\.+ ，[\w-]+ , 大于\xa0的字符+ ，为什么匹配这三个请看上面的链接
                    characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

                    // Loosely modeled on CSS identifier characters
                    // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
                    // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                    // identifier = "(?:\\.|[\w#-]|[^\x00-\xa0])+"
                    identifier = characterEncoding.replace("w", "w#"),

                    // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
                    // attributes = "\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)[\x20\t\r\n\f]*(?:([*^$|!~]?=)[\x20\t\r\n\f]*(?:(['"])((?:\\.|[^\\])*?)\3|((?:\\.|[\w#-]|[^\x00-\xa0])+)|)|)[\x20\t\r\n\f]*\]"
                    // 得到的捕获组序列:
                    // $1:attrName, $2:([*^$|!~]?=), $3:(['\"]), $4:((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|), $5:(" + identifier + ")
                    // $1 捕获的是 attrName,
                    // $2 捕获的是 = 或 != 这样的等号方式，
                    // $3 捕获单双引号
                    // $4 提供三种匹配字符串的方式：\\.*?\3,非斜$杠*?\3(因为斜杠没意义),识别符,此处相当于捕获 attrValue，只不过要兼容带引号和不带两种形式
                    // $5 捕获识别符
                    // 看 attributes 开头和结尾匹配的是代表属性选择符的'['和']'，
                    // 所以整个正则捕获出来的结果分别代表的含义是[ attrName、等号、引号、attrValue、attrValue ]
                    // 大致就是可以匹配 "[name = abc]" | "[name = 'abc']" 这种属性表达式
                    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                    "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

                    // Prefer arguments quoted,
                    //   then not containing pseudos/brackets,
                    //   then attribute selectors/non-parenthetical expressions,
                    //   then anything else
                    // These preferences are here to reduce the number of selectors
                    //   needing tokenize in the PSEUDO preFilter
                    // 伪类
                    // 得到的捕获组序列:
                    // $1: pseudoName
                    // $2: ((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)
                    // $3: (['\"])
                    // $4: ((?:\\\\.|[^\\\\])*?),$5:((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)
                    // $1 捕获伪元素或伪类的名字，
                    // $2 捕获两种类型的字符，一种是带引号的字符串，一种是attributes那样的键值对
                    // $3 捕获引号，
                    // $4 和 $5 分别捕获 $2 中的一部分
                    pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",

                    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                    // 匹配前后空格
                    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                    // 匹配逗号
                    // 这个后面用来清除 css 规则中组与组之间的逗号
                    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),

                    // 选择器当中的关系连接符 [>+~ whitespace ]
                    // $1: ([>+~]|whitespace)分别捕获4种连接符:'>','+','~','whitespace'
                    // 第二个 whitespace 的作用是匹配空格，表示关系连接符 当中的后代关系（例如"div p"这里面的空格）
                    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                    // 兄弟关系[+~]
                    rsibling = new RegExp(whitespace + "*[+~]"),

                    // rattributeQuotes = new RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*)[\\x20\\t\\r\\n\\f]*\\]","g")
                    // 匹配属性等号 [type = xxx] =之后的 = xxx]
                    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"),

                    // 构造匹配伪类的正则表达式
                    rpseudo = new RegExp(pseudos),

                    // 构造匹配符合 css 命名规范的字符串正则表达式
                    ridentifier = new RegExp("^" + identifier + "$"),

                    // 存储了匹配各类选择器的数组
                    // 这里是最后用来检测的正则表达式，
                    // 使用形式通常是matchExpr[tokens[i].type].test(...)
                    matchExpr = {
                        "ID": new RegExp("^#(" + characterEncoding + ")"),
                        "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                        "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                        "ATTR": new RegExp("^" + attributes),
                        "PSEUDO": new RegExp("^" + pseudos),
                        "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                            "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                            "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                        "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                        // For use in libraries implementing .is()
                        // We use this for POS matching in `select`
                        "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                            whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                    },

                    // 检测浏览器是否支持诸如 document.getElementById 、document.getElementByClassName 等方法
                    rnative = /^[^{]+\{\s*\[native \w/,

                    // Easily-parseable/retrievable ID or TAG or CLASS selectors
                    // 便捷的匹配 id tag 或者 class 选择器
                    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                    // 匹配input类型 ：
                    // input select textarea button
                    rinputs = /^(?:input|select|textarea|button)$/i,

                    // 匹配 h1 ~ h6 标签
                    rheader = /^h\d$/i,

                    // 匹配 ' 和 \
                    rescape = /'|\\/g,

                    // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                    // runescape = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/gi
                    // 正则匹配字符编码，类似 \0a0000 这样的编码
                    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),

                    // jQuery还考虑了编码 http://zh.wikipedia.org/wiki/UTF-16
                    // 转换为 UTF-16 编码，若某个字符是多种字符，超过 BMP 的计数范围 0xFFFF ,则必须将其编码成小于 0x10000 的形式。
                    funescape = function(_, escaped, escapedWhitespace) {
                        var high = "0x" + escaped - 0x10000;
                        // NaN means non-codepoint
                        // Support: Firefox
                        // Workaround erroneous numeric interpretation of +"0x"
                        // 这里的 high !== 用于判断 high是否是 NaN , NaN !== NaN
                        // 当 high 为 NaN , escapedWhitespace 为 undefined 时，再判断 high 是否为负数
                        return high !== high || escapedWhitespace ?
                            escaped :
                            // BMP codepoint
                            high < 0 ?
                            String.fromCharCode(high + 0x10000) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                    };

                // Optimize for push.apply( _, NodeList )
                // 对 push.apply( _, NodeList ) 进行优化
                try {
                    push.apply(
                        (arr = slice.call(preferredDoc.childNodes)),
                        preferredDoc.childNodes
                    );
                    // Support: Android<4.0
                    // Detect silently failing push.apply
                    arr[preferredDoc.childNodes.length].nodeType;
                } catch (e) {
                    push = {
                        apply: arr.length ?

                            // Leverage slice if possible
                            function(target, els) {
                                push_native.apply(target, slice.call(els));
                            } :

                            // Support: IE<9
                            // Otherwise append directly
                            function(target, els) {
                                var j = target.length,
                                    i = 0;
                                // Can't trust NodeList.length
                                while ((target[j++] = els[i++])) {}
                                target.length = j - 1;
                            }
                    };
                }

                // Sizzle 引擎的入口函数
                // 选择器入口，jQuery 的构造函数要处理 6 大类情况
                // 但是只有在处理选择器表达式(selector expression)时才会调用 Sizzle 选择器引擎。
                // @param selector 已去掉头尾空白的选择器字符串
                // @param context 执行匹配的最初的上下文（即DOM元素集合）。若context没有赋值，则取document。
                // @param results 已匹配出的部分最终结果。若results没有赋值，则赋予空数组。
                // @param seed 初始集合
                function Sizzle(selector, context, results, seed) {
                    var match, elem, m, nodeType,
                        // QSA vars
                        // QSA 表示 querySelectorAll ，高级浏览器支持 querySelectorAll 这个接口，Sizzle 的作用就是兼容不支持的低级浏览器
                        i, groups, old, nid, newContext, newSelector;

                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        // 根据不同的浏览器环境,设置合适的 Expr 方法,构造合适的 rbuggy 测试
                        setDocument(context);
                    }

                    // 执行匹配的最初的上下文（即DOM元素集合）。若context没有赋值，则取document
                    // 已匹配出的部分最终结果。若results没有赋值，则赋予空数组
                    context = context || document;
                    results = results || [];

                    // 如果选择器字符串为空，返回 results
                    // results 可能是已匹配出的部分最终结果，也可能是空数组
                    if (!selector || typeof selector !== "string") {
                        return results;
                    }

                    // nodeType 属性返回被选节点的节点类型
                    // nodeType 各个数字所代表的含义 http://www.w3school.com.cn/xmldom/prop_element_nodetype.asp
                    // 1 -- Element
                    // 9 -- Document
                    // 如果上下文传入错误，返回空数组
                    if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                        return [];
                    }

                    // 不存在 seed 集合
                    // seed - 种子合集（搜索器搜到符合条件的标签）
                    if (documentIsHTML && !seed) {

                        // Shortcuts
                        // 快速匹配，如果是 id 、tag 或者 class 选择器
                        // rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/
                        if ((match = rquickExpr.exec(selector))) {
                            // Speed-up: Sizzle("#ID")
                            // selector会匹配 #[id] | [tag] | .[class] 其中之一
                            // match[1] 的值是元素是与 rquickExpr 的第 1 个子表达式相匹配的文本，
                            // 在这里 match[1] 就是匹配到的 id 选择器的名字（如果有）
                            // 如果匹配到 id 选择器 #xx
                            if ((m = match[1])) {
                                // 9 -- Document
                                // 如果上下文是 document
                                if (nodeType === 9) {
                                    // 利用原生方法 document.getElementById 匹配到的 elem
                                    elem = context.getElementById(m);
                                    // Check parentNode to catch when Blackberry 4.6 returns
                                    // nodes that are no longer in the document #6963
                                    if (elem && elem.parentNode) {
                                        // Handle the case where IE, Opera, and Webkit return items
                                        // by name instead of ID
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        // 返回结果
                                        return results;
                                    }
                                } else {
                                    // Context is not a document
                                    // 上下文不是 document
                                    if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                                        contains(context, elem) && elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                }

                                // Speed-up: Sizzle("TAG")
                                // 在这里 match[2] 就是匹配到的 tag 选择器的名字（如果有）
                                // 如果匹配到 tag 选择器 诸如div p 等
                            } else if (match[2]) {
                                // 利用原生方法 getElementsByTagName 找到元素
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;

                                // Speed-up: Sizzle(".CLASS")
                                // 在这里 match[3] 就是匹配到的 class 选择器的名字（如果有）
                                // 如果匹配到 class 选择器 .xxx
                                // 并且
                                // support.getElementsByClassName 为 true 表示浏览器支持 getElementsByClassName 这个方法
                            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }

                        // QSA path
                        // QSA 表示 querySelectorAll，原生的QSA运行速度非常快,因此尽可能使用 QSA 来对 CSS 选择器进行查询
                        // querySelectorAll 是原生的选择器，但不支持老的浏览器版本, 主要是 IE8 及以前的浏览器
                        // rbuggyQSA 保存了用于解决一些浏览器兼容问题的 bug 修补的正则表达式
                        // QSA 在不同浏览器上运行的效果有差异，表现得非常奇怪，因此对某些 selector 不能用 QSA
                        // 为了适应不同的浏览器，就需要首先进行浏览器兼容性测试，然后确定测试正则表达式,用 rbuggyQSA 来确定 selector 是否能用 QSA
                        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            nid = old = expando;
                            newContext = context;
                            newSelector = nodeType === 9 && selector;

                            // qSA works strangely on Element-rooted queries
                            // We can work around this by specifying an extra ID on the root
                            // and working up from there (Thanks to Andrew Dupont for the technique)
                            // IE 8 doesn't work on object elements
                            // QSA 在以某个根节点ID为基础的查找中(.rootClass span)表现很奇怪，
                            // 它会忽略某些selector选项，返回不合适的结果
                            // 一个比较通常的解决方法是为根节点设置一个额外的id，并以此开始查询
                            if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                                // 调用词法分析器分析选择器，得到一个 Token 序列
                                groups = tokenize(selector);

                                // 保存并设置新id
                                if ((old = context.getAttribute("id"))) {
                                    nid = old.replace(rescape, "\\$&");
                                } else {
                                    context.setAttribute("id", nid);
                                }
                                nid = "[id='" + nid + "'] ";

                                // 把新的id添加到 Token 序列里
                                i = groups.length;

                                while (i--) {
                                    groups[i] = nid + toSelector(groups[i]);
                                }
                                // 构造新的上下文
                                newContext = rsibling.test(selector) && context.parentNode || context;
                                // 构造新的选择器
                                newSelector = groups.join(",");
                            }

                            // 使用新的选择器通过QSA来查询元素
                            if (newSelector) {
                                try {
                                    // 将查询结果合并到results上
                                    push.apply(results,
                                        newContext.querySelectorAll(newSelector)
                                    );
                                    return results;
                                } catch (qsaError) {} finally {
                                    // 如果没有旧 id ,则移除
                                    if (!old) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }

                    // All others
                    // 到这里仍没有返回结果，表明这些 selector 无法直接使用原生的 document 查询方法（当前浏览器不支持 QSA）
                    // 调用 select 方法
                    return select(selector.replace(rtrim, "$1"), context, results, seed);
                }

                /**
                 * Create key-value caches of limited size
                 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
                 *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
                 *  deleting the oldest entry
                 */
                // 创建一个 key-value 格式的缓存
                function createCache() {
                    // 用来保存已经存储过的 key-value，这是一种闭包
                    var keys = [];

                    // 这里使用cache这个函数本身来当作存放数据的对象
                    function cache(key, value) {
                        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                        // key 后面加空格是为了避免覆盖原生属性
                        // 当缓存栈超过长度限制时，则需要删除以前的缓存（后进先出，从栈底删除）
                        if (keys.push(key += " ") > Expr.cacheLength) {
                            // Only keep the most recent entries
                            delete cache[keys.shift()];
                        }
                        // 返回存储好的信息
                        return (cache[key] = value);
                    }
                    return cache;
                }

                /**
                 * Mark a function for special use by Sizzle
                 * @param {Function} fn The function to mark
                 */
                // 标记函数
                function markFunction(fn) {
                    fn[expando] = true;
                    return fn;
                }

                /**
                 * Support testing using an element
                 * @param {Function} fn Passed the created div and expects a boolean result
                 */
                // 使用 assert(function(div){}) 函数进程浏览器 bug 测试
                // assert 函数建立一个 div 节点，将这个 div 节点传递给回调函数
                // div 节点在 assert 函数结束时会被删除，此时注意要删除由回调函数创建的子节点，并将 div 赋值 null 以让 GC 回收。
                function assert(fn) {
                    // 创建测试用节点
                    var div = document.createElement("div");

                    try {
                        // 转换fn的返回值为boolean值
                        // fn(div) -- assert(function(div){}) 这里的 div 就是上面创建的测试节点
                        return !!fn(div);
                    } catch (e) {
                        return false;
                        // 结束时移除这个节点
                    } finally {
                        // Remove from its parent by default
                        if (div.parentNode) {
                            div.parentNode.removeChild(div);
                        }
                        // release memory in IE
                        // 在 IE 里释放内存
                        div = null;
                    }
                }

                /**
                 * Adds the same handler for all of the specified attrs
                 * @param {String} attrs Pipe-separated list of attributes
                 * @param {Function} handler The method that will be applied
                 */
                //
                function addHandle(attrs, handler) {
                    var arr = attrs.split("|"),
                        i = attrs.length;

                    while (i--) {
                        Expr.attrHandle[arr[i]] = handler;
                    }
                }

                /**
                 * Checks document order of two siblings
                 * @param {Element} a
                 * @param {Element} b
                 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
                 */
                function siblingCheck(a, b) {
                    var cur = b && a,
                        diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        (~b.sourceIndex || MAX_NEGATIVE) -
                        (~a.sourceIndex || MAX_NEGATIVE);

                    // Use IE sourceIndex if available on both nodes
                    if (diff) {
                        return diff;
                    }

                    // Check if b follows a
                    if (cur) {
                        while ((cur = cur.nextSibling)) {
                            if (cur === b) {
                                return -1;
                            }
                        }
                    }

                    return a ? 1 : -1;
                }

                /**
                 * Returns a function to use in pseudos for input types
                 * @param {String} type
                 */
                function createInputPseudo(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === type;
                    };
                }

                /**
                 * Returns a function to use in pseudos for buttons
                 * @param {String} type
                 */
                function createButtonPseudo(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return (name === "input" || name === "button") && elem.type === type;
                    };
                }

                /**
                 * Returns a function to use in pseudos for positionals
                 * @param {Function} fn
                 */
                function createPositionalPseudo(fn) {
                    return markFunction(function(argument) {
                        argument = +argument;
                        return markFunction(function(seed, matches) {
                            var j,
                                matchIndexes = fn([], seed.length, argument),
                                i = matchIndexes.length;

                            // Match elements found at the specified indexes
                            while (i--) {
                                if (seed[(j = matchIndexes[i])]) {
                                    seed[j] = !(matches[j] = seed[j]);
                                }
                            }
                        });
                    });
                }

                /**
                 * Detect xml
                 * @param {Element|Object} elem An element or a document
                 */
                isXML = Sizzle.isXML = function(elem) {
                    // documentElement is verified for cases where it doesn't yet exist
                    // (such as loading iframes in IE - #4833)
                    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                    return documentElement ? documentElement.nodeName !== "HTML" : false;
                };

                // Expose support vars for convenience
                // 暴露 support 变量
                support = Sizzle.support = {};

                /**
                 * Sets document-related variables once based on the current document
                 * @param {Element|Object} [doc] An element or document object to use to set the document
                 * @returns {Object} Returns the current document
                 */

                setDocument = Sizzle.setDocument = function(node) {
                    var doc = node ? node.ownerDocument || node : preferredDoc,
                        parent = doc.defaultView;

                    // If no document and documentElement is available, return
                    if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                        return document;
                    }

                    // Set our document
                    document = doc;
                    docElem = doc.documentElement;

                    // Support tests
                    documentIsHTML = !isXML(doc);

                    // Support: IE>8
                    // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                    // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                    // IE6-8 do not support the defaultView property so parent will be undefined
                    if (parent && parent.attachEvent && parent !== parent.top) {
                        parent.attachEvent("onbeforeunload", function() {
                            setDocument();
                        });
                    }

                    /* Attributes
                    ---------------------------------------------------------------------- */

                    // Support: IE<8
                    // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
                    support.attributes = assert(function(div) {
                        div.className = "i";
                        return !div.getAttribute("className");
                    });

                    /* getElement(s)By*
                    ---------------------------------------------------------------------- */

                    // Check if getElementsByTagName("*") returns only elements
                    // 检查 getElementsByTagName 浏览器是否支持
                    support.getElementsByTagName = assert(function(div) {
                        div.appendChild(doc.createComment(""));
                        return !div.getElementsByTagName("*").length;
                    });

                    // Check if getElementsByClassName can be trusted
                    support.getElementsByClassName = assert(function(div) {
                        div.innerHTML = "<div class='a'></div><div class='a i'></div>";

                        // Support: Safari<4
                        // Catch class over-caching
                        div.firstChild.className = "i";
                        // Support: Opera<10
                        // Catch gEBCN failure to find non-leading classes
                        return div.getElementsByClassName("i").length === 2;
                    });

                    // Support: IE<10
                    // Check if getElementById returns elements by name
                    // The broken getElementById methods don't pick up programatically-set names,
                    // so use a roundabout getElementsByName test
                    // 兼容 IE10 以下
                    // 检查是否 getElementById
                    // getElemenById 方法不收集程序设置的 name 属性，所以迂回的使用 getElementsByName 测试
                    support.getById = assert(function(div) {
                        docElem.appendChild(div).id = expando;
                        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
                    });

                    // ID find and filter
                    // 定义 id 选择器的实现方法 Expr.find["ID"] 以及过滤方法 Expr.filter["ID"]
                    if (support.getById) {
                        Expr.find["ID"] = function(id, context) {
                            if (typeof context.getElementById !== strundefined && documentIsHTML) {
                                var m = context.getElementById(id);
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document #6963
                                return m && m.parentNode ? [m] : [];
                            }
                        };
                        // ID元匹配器工厂
                        Expr.filter["ID"] = function(id) {
                            var attrId = id.replace(runescape, funescape);
                            // 生成一个匹配器
                            return function(elem) {
                                return elem.getAttribute("id") === attrId;
                            };
                        };
                    } else {
                        // Support: IE6/7
                        // getElementById is not reliable as a find shortcut
                        // 兼容ie6 7
                        delete Expr.find["ID"];
                        Expr.filter["ID"] = function(id) {
                            var attrId = id.replace(runescape, funescape);
                            // 生成一个匹配器
                            return function(elem) {
                                var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                                return node && node.value === attrId;
                            };
                        };
                    }

                    // Tag
                    // 定义 Tag 选择器的实现方法
                    Expr.find["TAG"] = support.getElementsByTagName ?
                        function(tag, context) {
                            if (typeof context.getElementsByTagName !== strundefined) {
                                return context.getElementsByTagName(tag);
                            }
                        } :
                        function(tag, context) {
                            var elem,
                                tmp = [],
                                i = 0,
                                results = context.getElementsByTagName(tag);

                            // Filter out possible comments
                            if (tag === "*") {
                                while ((elem = results[i++])) {
                                    if (elem.nodeType === 1) {
                                        tmp.push(elem);
                                    }
                                }

                                return tmp;
                            }
                            return results;
                        };

                    // Class
                    // 定义 Class 选择器的实现方法
                    Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                        if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                            return context.getElementsByClassName(className);
                        }
                    };

                    /* QSA/matchesSelector
                         QSA -- querySelectorAll
                    ---------------------------------------------------------------------- */

                    // QSA and matchesSelector support

                    // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                    rbuggyMatches = [];

                    // qSa(:focus) reports false when true (Chrome 21)
                    // We allow this because of a bug in IE8/9 that throws an error
                    // whenever `document.activeElement` is accessed on an iframe
                    // So, we allow :focus to pass through QSA all the time to avoid the IE error
                    // See http://bugs.jquery.com/ticket/13378
                    rbuggyQSA = [];

                    // 如果 rnative.test(doc.querySelectorAll) 为 true
                    // 即是 浏览器支持 querySelectorAll
                    // rbuggyQSA -- 保存了用于解决一些浏览器兼容问题的 bug 修补的正则表达式
                    if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                        // Build QSA regex
                        // Regex strategy adopted from Diego Perini
                        // 一个利用 assert 函数的 bug 测试例子
                        assert(function(div) {
                            // Select is set to empty string on purpose
                            // This is to test IE's treatment of not explicitly
                            // setting a boolean content attribute,
                            // since its presence should be enough
                            // http://bugs.jquery.com/ticket/12359
                            // 创建一些子节点
                            div.innerHTML = "<select><option selected=''></option></select>";

                            // Support: IE8
                            // Boolean attributes and "value" are not treated correctly
                            // 测试 document.querySelectorAll() 的正确性
                            if (!div.querySelectorAll("[selected]").length) {
                                rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                            }

                            // Webkit/Opera - :checked should return selected option elements
                            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                            // IE8 throws error here and will not see later tests
                            if (!div.querySelectorAll(":checked").length) {
                                rbuggyQSA.push(":checked");
                            }
                        });

                        //
                        assert(function(div) {

                            // Support: Opera 10-12/IE8
                            // ^= $= *= and empty values
                            // Should not select anything
                            // Support: Windows 8 Native Apps
                            // The type attribute is restricted during .innerHTML assignment
                            var input = doc.createElement("input");
                            input.setAttribute("type", "hidden");
                            div.appendChild(input).setAttribute("t", "");

                            if (div.querySelectorAll("[t^='']").length) {
                                rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                            }

                            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                            // IE8 throws error here and will not see later tests
                            if (!div.querySelectorAll(":enabled").length) {
                                rbuggyQSA.push(":enabled", ":disabled");
                            }

                            // Opera 10-11 does not throw on post-comma invalid pseudos
                            div.querySelectorAll("*,:x");
                            rbuggyQSA.push(",.*:");
                        });
                    }

                    if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector ||
                            docElem.mozMatchesSelector ||
                            docElem.oMatchesSelector ||
                            docElem.msMatchesSelector)))) {

                        assert(function(div) {
                            // Check to see if it's possible to do matchesSelector
                            // on a disconnected node (IE 9)
                            support.disconnectedMatch = matches.call(div, "div");

                            // This should fail with an exception
                            // Gecko does not error, returns false instead
                            matches.call(div, "[s!='']:x");
                            rbuggyMatches.push("!=", pseudos);
                        });
                    }

                    rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                    rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                    /* Contains
                    ---------------------------------------------------------------------- */

                    // Element contains another
                    // Purposefully does not implement inclusive descendent
                    // As in, an element does not contain itself
                    contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ?
                        function(a, b) {
                            var adown = a.nodeType === 9 ? a.documentElement : a,
                                bup = b && b.parentNode;
                            return a === bup || !!(bup && bup.nodeType === 1 && (
                                adown.contains ?
                                adown.contains(bup) :
                                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                            ));
                        } :
                        function(a, b) {
                            if (b) {
                                while ((b = b.parentNode)) {
                                    if (b === a) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };

                    /* Sorting
                    ---------------------------------------------------------------------- */

                    // Document order sorting
                    sortOrder = docElem.compareDocumentPosition ?
                        function(a, b) {

                            // Flag for duplicate removal
                            if (a === b) {
                                hasDuplicate = true;
                                return 0;
                            }

                            var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);

                            if (compare) {
                                // Disconnected nodes
                                if (compare & 1 ||
                                    (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                                    // Choose the first element that is related to our preferred document
                                    if (a === doc || contains(preferredDoc, a)) {
                                        return -1;
                                    }
                                    if (b === doc || contains(preferredDoc, b)) {
                                        return 1;
                                    }

                                    // Maintain original order
                                    return sortInput ?
                                        (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                                        0;
                                }

                                return compare & 4 ? -1 : 1;
                            }

                            // Not directly comparable, sort on existence of method
                            return a.compareDocumentPosition ? -1 : 1;
                        } :
                        function(a, b) {
                            var cur,
                                i = 0,
                                aup = a.parentNode,
                                bup = b.parentNode,
                                ap = [a],
                                bp = [b];

                            // Exit early if the nodes are identical
                            if (a === b) {
                                hasDuplicate = true;
                                return 0;

                                // Parentless nodes are either documents or disconnected
                            } else if (!aup || !bup) {
                                return a === doc ? -1 :
                                    b === doc ? 1 :
                                    aup ? -1 :
                                    bup ? 1 :
                                    sortInput ?
                                    (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                                    0;

                                // If the nodes are siblings, we can do a quick check
                            } else if (aup === bup) {
                                return siblingCheck(a, b);
                            }

                            // Otherwise we need full lists of their ancestors for comparison
                            cur = a;
                            while ((cur = cur.parentNode)) {
                                ap.unshift(cur);
                            }
                            cur = b;
                            while ((cur = cur.parentNode)) {
                                bp.unshift(cur);
                            }

                            // Walk down the tree looking for a discrepancy
                            while (ap[i] === bp[i]) {
                                i++;
                            }

                            return i ?
                                // Do a sibling check if the nodes have a common ancestor
                                siblingCheck(ap[i], bp[i]) :

                                // Otherwise nodes in our document sort first
                                ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                0;
                        };

                    return doc;
                };

                Sizzle.matches = function(expr, elements) {
                    return Sizzle(expr, null, null, elements);
                };

                Sizzle.matchesSelector = function(elem, expr) {
                    // Set document vars if needed
                    if ((elem.ownerDocument || elem) !== document) {
                        setDocument(elem);
                    }

                    // Make sure that attribute selectors are quoted
                    expr = expr.replace(rattributeQuotes, "='$1']");

                    if (support.matchesSelector && documentIsHTML &&
                        (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                        (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                        try {
                            var ret = matches.call(elem, expr);

                            // IE 9's matchesSelector returns false on disconnected nodes
                            if (ret || support.disconnectedMatch ||
                                // As well, disconnected nodes are said to be in a document
                                // fragment in IE 9
                                elem.document && elem.document.nodeType !== 11) {
                                return ret;
                            }
                        } catch (e) {}
                    }

                    return Sizzle(expr, document, null, [elem]).length > 0;
                };

                Sizzle.contains = function(context, elem) {
                    // Set document vars if needed
                    if ((context.ownerDocument || context) !== document) {
                        setDocument(context);
                    }
                    return contains(context, elem);
                };

                Sizzle.attr = function(elem, name) {
                    // Set document vars if needed
                    if ((elem.ownerDocument || elem) !== document) {
                        setDocument(elem);
                    }

                    var fn = Expr.attrHandle[name.toLowerCase()],
                        // Don't get fooled by Object.prototype properties (jQuery #13807)
                        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                        fn(elem, name, !documentIsHTML) :
                        undefined;

                    return val === undefined ?
                        support.attributes || !documentIsHTML ?
                        elem.getAttribute(name) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                        val.value :
                        null :
                        val;
                };

                // 抛出异常
                Sizzle.error = function(msg) {
                    throw new Error("Syntax error, unrecognized expression: " + msg);
                };

                /**
                 * Document sorting and removing duplicates
                 * @param {ArrayLike} results
                 */
                Sizzle.uniqueSort = function(results) {
                    var elem,
                        duplicates = [],
                        j = 0,
                        i = 0;

                    // Unless we *know* we can detect duplicates, assume their presence
                    hasDuplicate = !support.detectDuplicates;
                    sortInput = !support.sortStable && results.slice(0);
                    results.sort(sortOrder);

                    if (hasDuplicate) {
                        while ((elem = results[i++])) {
                            if (elem === results[i]) {
                                j = duplicates.push(i);
                            }
                        }
                        while (j--) {
                            results.splice(duplicates[j], 1);
                        }
                    }

                    return results;
                };

                /**
                 * Utility function for retrieving the text value of an array of DOM nodes
                 * @param {Array|Element} elem
                 */
                getText = Sizzle.getText = function(elem) {
                    var node,
                        ret = "",
                        i = 0,
                        nodeType = elem.nodeType;

                    if (!nodeType) {
                        // If no nodeType, this is expected to be an array
                        for (;
                            (node = elem[i]); i++) {
                            // Do not traverse comment nodes
                            ret += getText(node);
                        }
                    } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                        // Use textContent for elements
                        // innerText usage removed for consistency of new lines (see #11153)
                        if (typeof elem.textContent === "string") {
                            return elem.textContent;
                        } else {
                            // Traverse its children
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                ret += getText(elem);
                            }
                        }
                    } else if (nodeType === 3 || nodeType === 4) {
                        return elem.nodeValue;
                    }
                    // Do not include comment or processing instruction nodes

                    return ret;
                };

                // 记录跟选择器相关的属性以及操作
                Expr = Sizzle.selectors = {

                    // Can be adjusted by the user
                    cacheLength: 50,

                    createPseudo: markFunction,

                    match: matchExpr,

                    attrHandle: {},

                    find: {},

                    // relative 用来表示节点间的关系，一个节点跟另一个节点有以下几种关系
                    // 父亲和儿子，用 > 表达
                    // 祖宗和后代 ，用 （空格） 表达
                    // 临近兄弟，用 + 表达
                    // 普通兄弟，用 ~ 表达
                    // first属性，用来标识两个节点的“紧密”程度,例如父子关系和临近兄弟关系就是紧密的
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: true
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: true
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },

                    // 预处理
                    preFilter: {
                        "ATTR": function(match) {
                            match[1] = match[1].replace(runescape, funescape);

                            // Move the given value to match[3] whether quoted or unquoted
                            match[3] = (match[4] || match[5] || "").replace(runescape, funescape);

                            if (match[2] === "~=") {
                                match[3] = " " + match[3] + " ";
                            }

                            return match.slice(0, 4);
                        },

                        "CHILD": function(match) {
                            /* matches from matchExpr["CHILD"]
                                1 type (only|nth|...)
                                2 what (child|of-type)
                                3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                                4 xn-component of xn+y argument ([+-]?\d*n|)
                                5 sign of xn-component
                                6 x of xn-component
                                7 sign of y-component
                                8 y of y-component
                            */
                            match[1] = match[1].toLowerCase();

                            if (match[1].slice(0, 3) === "nth") {
                                // nth-* requires argument
                                if (!match[3]) {
                                    Sizzle.error(match[0]);
                                }

                                // numeric x and y parameters for Expr.filter.CHILD
                                // remember that false/true cast respectively to 0/1
                                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                                match[5] = +((match[7] + match[8]) || match[3] === "odd");

                                // other types prohibit arguments
                            } else if (match[3]) {
                                Sizzle.error(match[0]);
                            }

                            return match;
                        },

                        "PSEUDO": function(match) {
                            var excess,
                                unquoted = !match[5] && match[2];

                            if (matchExpr["CHILD"].test(match[0])) {
                                return null;
                            }

                            // Accept quoted arguments as-is
                            if (match[3] && match[4] !== undefined) {
                                match[2] = match[4];

                                // Strip excess characters from unquoted arguments
                            } else if (unquoted && rpseudo.test(unquoted) &&
                                // Get excess from tokenize (recursively)
                                (excess = tokenize(unquoted, true)) &&
                                // advance to the next closing parenthesis
                                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                                // excess is a negative index
                                match[0] = match[0].slice(0, excess);
                                match[2] = unquoted.slice(0, excess);
                            }

                            // Return only captures needed by the pseudo filter method (type and argument)
                            return match.slice(0, 3);
                        }
                    },

                    // 过滤器
                    filter: {
                        // TAG 过滤
                        "TAG": function(nodeNameSelector) {
                            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                            return nodeNameSelector === "*" ?
                                function() {
                                    return true;
                                } :
                                function(elem) {
                                    return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                                };
                        },

                        // CLASS 过滤
                        "CLASS": function(className) {
                            var pattern = classCache[className + " "];

                            return pattern ||
                                (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                                classCache(className, function(elem) {
                                    return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                                });
                        },

                        // 属性过滤
                        "ATTR": function(name, operator, check) {
                            return function(elem) {
                                var result = Sizzle.attr(elem, name);

                                if (result == null) {
                                    return operator === "!=";
                                }
                                if (!operator) {
                                    return true;
                                }

                                result += "";

                                return operator === "=" ? result === check :
                                    operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf(check) === 0 :
                                    operator === "*=" ? check && result.indexOf(check) > -1 :
                                    operator === "$=" ? check && result.slice(-check.length) === check :
                                    operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
                                    operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                    false;
                            };
                        },

                        //
                        "CHILD": function(type, what, argument, first, last) {
                            var simple = type.slice(0, 3) !== "nth",
                                forward = type.slice(-4) !== "last",
                                ofType = what === "of-type";

                            return first === 1 && last === 0 ?

                                // Shortcut for :nth-*(n)
                                function(elem) {
                                    return !!elem.parentNode;
                                } :

                                function(elem, context, xml) {
                                    var cache, outerCache, node, diff, nodeIndex, start,
                                        dir = simple !== forward ? "nextSibling" : "previousSibling",
                                        parent = elem.parentNode,
                                        name = ofType && elem.nodeName.toLowerCase(),
                                        useCache = !xml && !ofType;

                                    if (parent) {

                                        // :(first|last|only)-(child|of-type)
                                        if (simple) {
                                            while (dir) {
                                                node = elem;
                                                while ((node = node[dir])) {
                                                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                        return false;
                                                    }
                                                }
                                                // Reverse direction for :only-* (if we haven't yet done so)
                                                start = dir = type === "only" && !start && "nextSibling";
                                            }
                                            return true;
                                        }

                                        start = [forward ? parent.firstChild : parent.lastChild];

                                        // non-xml :nth-child(...) stores cache data on `parent`
                                        if (forward && useCache) {
                                            // Seek `elem` from a previously-cached index
                                            outerCache = parent[expando] || (parent[expando] = {});
                                            cache = outerCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = cache[0] === dirruns && cache[2];
                                            node = nodeIndex && parent.childNodes[nodeIndex];

                                            while ((node = ++nodeIndex && node && node[dir] ||

                                                    // Fallback to seeking `elem` from the start
                                                    (diff = nodeIndex = 0) || start.pop())) {

                                                // When found, cache indexes on `parent` and break
                                                if (node.nodeType === 1 && ++diff && node === elem) {
                                                    outerCache[type] = [dirruns, nodeIndex, diff];
                                                    break;
                                                }
                                            }

                                            // Use previously-cached element index if available
                                        } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                            diff = cache[1];

                                            // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        } else {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                    (diff = nodeIndex = 0) || start.pop())) {

                                                if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                                    }

                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }

                                        // Incorporate the offset, then check against cycle size
                                        diff -= last;
                                        return diff === first || (diff % first === 0 && diff / first >= 0);
                                    }
                                };
                        },

                        "PSEUDO": function(pseudo, argument) {
                            // pseudo-class names are case-insensitive
                            // http://www.w3.org/TR/selectors/#pseudo-classes
                            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                            // Remember that setFilters inherits from pseudos
                            var args,
                                fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                                Sizzle.error("unsupported pseudo: " + pseudo);

                            // The user may use createPseudo to indicate that
                            // arguments are needed to create the filter function
                            // just as Sizzle does
                            if (fn[expando]) {
                                return fn(argument);
                            }

                            // But maintain support for old signatures
                            if (fn.length > 1) {
                                args = [pseudo, pseudo, "", argument];
                                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                    markFunction(function(seed, matches) {
                                        var idx,
                                            matched = fn(seed, argument),
                                            i = matched.length;
                                        while (i--) {
                                            idx = indexOf.call(seed, matched[i]);
                                            seed[idx] = !(matches[idx] = matched[i]);
                                        }
                                    }) :
                                    function(elem) {
                                        return fn(elem, 0, args);
                                    };
                            }

                            return fn;
                        }
                    },

                    pseudos: {
                        // Potentially complex pseudos
                        "not": markFunction(function(selector) {
                            // Trim the selector passed to compile
                            // to avoid treating leading and trailing
                            // spaces as combinators
                            var input = [],
                                results = [],
                                matcher = compile(selector.replace(rtrim, "$1"));

                            return matcher[expando] ?
                                markFunction(function(seed, matches, context, xml) {
                                    var elem,
                                        unmatched = matcher(seed, null, xml, []),
                                        i = seed.length;

                                    // Match elements unmatched by `matcher`
                                    while (i--) {
                                        if ((elem = unmatched[i])) {
                                            seed[i] = !(matches[i] = elem);
                                        }
                                    }
                                }) :
                                function(elem, context, xml) {
                                    input[0] = elem;
                                    matcher(input, null, xml, results);
                                    return !results.pop();
                                };
                        }),

                        "has": markFunction(function(selector) {
                            return function(elem) {
                                return Sizzle(selector, elem).length > 0;
                            };
                        }),

                        "contains": markFunction(function(text) {
                            return function(elem) {
                                return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                            };
                        }),

                        // "Whether an element is represented by a :lang() selector
                        // is based solely on the element's language value
                        // being equal to the identifier C,
                        // or beginning with the identifier C immediately followed by "-".
                        // The matching of C against the element's language value is performed case-insensitively.
                        // The identifier C does not have to be a valid language name."
                        // http://www.w3.org/TR/selectors/#lang-pseudo
                        "lang": markFunction(function(lang) {
                            // lang value must be a valid identifier
                            if (!ridentifier.test(lang || "")) {
                                Sizzle.error("unsupported lang: " + lang);
                            }
                            lang = lang.replace(runescape, funescape).toLowerCase();
                            return function(elem) {
                                var elemLang;
                                do {
                                    if ((elemLang = documentIsHTML ?
                                            elem.lang :
                                            elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                        elemLang = elemLang.toLowerCase();
                                        return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                    }
                                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                                return false;
                            };
                        }),

                        // Miscellaneous
                        "target": function(elem) {
                            var hash = window.location && window.location.hash;
                            return hash && hash.slice(1) === elem.id;
                        },

                        "root": function(elem) {
                            return elem === docElem;
                        },

                        "focus": function(elem) {
                            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                        },

                        // Boolean properties
                        "enabled": function(elem) {
                            return elem.disabled === false;
                        },

                        "disabled": function(elem) {
                            return elem.disabled === true;
                        },

                        "checked": function(elem) {
                            // In CSS3, :checked should return both checked and selected elements
                            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                            var nodeName = elem.nodeName.toLowerCase();
                            return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                        },

                        "selected": function(elem) {
                            // Accessing this property makes selected-by-default
                            // options in Safari work properly
                            if (elem.parentNode) {
                                elem.parentNode.selectedIndex;
                            }

                            return elem.selected === true;
                        },

                        // Contents
                        "empty": function(elem) {
                            // http://www.w3.org/TR/selectors/#empty-pseudo
                            // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
                            //   not comment, processing instructions, or others
                            // Thanks to Diego Perini for the nodeName shortcut
                            //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                if (elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4) {
                                    return false;
                                }
                            }
                            return true;
                        },

                        "parent": function(elem) {
                            return !Expr.pseudos["empty"](elem);
                        },

                        // Element/input types
                        "header": function(elem) {
                            return rheader.test(elem.nodeName);
                        },

                        "input": function(elem) {
                            return rinputs.test(elem.nodeName);
                        },

                        "button": function(elem) {
                            var name = elem.nodeName.toLowerCase();
                            return name === "input" && elem.type === "button" || name === "button";
                        },

                        "text": function(elem) {
                            var attr;
                            // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
                            // use getAttribute instead to test this case
                            return elem.nodeName.toLowerCase() === "input" &&
                                elem.type === "text" &&
                                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type);
                        },

                        // Position-in-collection
                        "first": createPositionalPseudo(function() {
                            return [0];
                        }),

                        "last": createPositionalPseudo(function(matchIndexes, length) {
                            return [length - 1];
                        }),

                        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                            return [argument < 0 ? argument + length : argument];
                        }),

                        "even": createPositionalPseudo(function(matchIndexes, length) {
                            var i = 0;
                            for (; i < length; i += 2) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),

                        "odd": createPositionalPseudo(function(matchIndexes, length) {
                            var i = 1;
                            for (; i < length; i += 2) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),

                        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                            var i = argument < 0 ? argument + length : argument;
                            for (; --i >= 0;) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),

                        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                            var i = argument < 0 ? argument + length : argument;
                            for (; ++i < length;) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        })
                    }
                };

                Expr.pseudos["nth"] = Expr.pseudos["eq"];

                // Add button/input type pseudos
                for (i in {
                        radio: true,
                        checkbox: true,
                        file: true,
                        password: true,
                        image: true
                    }) {
                    Expr.pseudos[i] = createInputPseudo(i);
                }
                for (i in {
                        submit: true,
                        reset: true
                    }) {
                    Expr.pseudos[i] = createButtonPseudo(i);
                }

                // Easy API for creating new setFilters
                function setFilters() {}
                setFilters.prototype = Expr.filters = Expr.pseudos;
                Expr.setFilters = new setFilters();

                // 词法分析，返回的是一个Token序列(根据是否是并联选择器，可能返回的是多组Token序列)
                // Sizzle的 Token 格式如下 ：{value:'匹配到的字符串', type:'对应的Token类型', matches:'正则匹配到的一个结构'}
                // 假设传入进来的选择器是：div > p + .clr[type="checkbox"], #id:first-child
                function tokenize(selector, parseOnly) {
                    // soFar 是表示目前还未分析的字符串剩余部分
                    // groups 表示目前已经匹配到的规则组，
                    // 在这个例子里边，groups的长度最后是2（传进来的选择器以逗号,分隔）
                    // 存放的是每个规则对应的Token序列
                    var matched, match, tokens, type,
                        soFar, groups, preFilters,
                        cached = tokenCache[selector + " "];

                    // 如果cache里边有，直接拿出来即可
                    if (cached) {
                        return parseOnly ? 0 : cached.slice(0);
                    }

                    // 初始化
                    soFar = selector;
                    groups = [];
                    // 这里的预处理器为了对匹配到的 Token 适当做一些调整
                    // 其实就是正则匹配到的内容的一个预处理
                    preFilters = Expr.preFilter;

                    // 当字符串还没解析完毕，循环开始
                    while (soFar) {

                        // Comma and first run
                        // 如果匹配到逗号，用逗号,分组
                        // whitespace = "[\\x20\\t\\r\\n\\f]",
                        // rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*")
                        if (!matched || (match = rcomma.exec(soFar))) {
                            if (match) {
                                // Don't consume trailing commas as valid
                                soFar = soFar.slice(match[0].length) || soFar;
                            }
                            // 往规则组里边压入一个Token序列，目前Token序列还是空的
                            groups.push(tokens = []);
                        }

                        matched = false;

                        // Combinators
                        // 先处理这几个特殊的Token ： >, +, 空格, ~
                        // 因为他们比较简单，并且是单字符的
                        // rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                        if ((match = rcombinators.exec(soFar))) {
                            // 获取到匹配的字符
                            matched = match.shift();

                            // 放入Token序列中
                            tokens.push({
                                value: matched,
                                // Cast descendant combinators to space
                                // rtrim 匹配头尾空格，这里是去掉头尾的空格
                                type: match[0].replace(rtrim, " ")
                            });
                            // 剩余还未分析的字符串需要减去这段已经分析过的
                            soFar = soFar.slice(matched.length);
                        }

                        // Filters
                        // 这里开始分析这几种Token ： TAG, ID, CLASS, ATTR, CHILD, PSEUDO, NAME
                        // Expr.filter里边对应地 就有这些key
                        for (type in Expr.filter) {
                            // 如果通过正则匹配到了 Token 格式：match = matchExpr[ type ].exec( soFar )
                            // 然后看看需不需要预处理：!preFilters[ type ]
                            // 如果需要 ，那么通过预处理器将匹配到的处理一下 ： match = preFilters[ type ]( match )
                            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                                    (match = preFilters[type](match)))) {
                                matched = match.shift();
                                // 放入Token序列中
                                tokens.push({
                                    value: matched,
                                    type: type,
                                    matches: match
                                });
                                // 剩余还未分析的字符串需要减去这段已经分析过的
                                soFar = soFar.slice(matched.length);
                            }
                        }

                        // 如果到了这里都还没matched到，那么说明这个选择器在这里有错误
                        // 直接中断词法分析过程
                        // 这就是Sizzle对词法分析的异常处理
                        if (!matched) {
                            break;
                        }
                    }

                    // Return the length of the invalid excess
                    // if we're just parsing
                    // Otherwise, throw an error or return tokens
                    // 如果只需要这个接口检查选择器的合法性，直接就返回 soFar 的剩余长度，倘若是大于零，说明选择器不合法
                    // 其余情况，如果 soFar 长度大于零，抛出异常；否则把 groups 记录在 cache 里边并返回，
                    return parseOnly ?
                        soFar.length :
                        soFar ?
                        Sizzle.error(selector) :
                        // Cache the tokens
                        tokenCache(selector, groups).slice(0);
                }

                function toSelector(tokens) {
                    var i = 0,
                        len = tokens.length,
                        selector = "";
                    for (; i < len; i++) {
                        selector += tokens[i].value;
                    }
                    return selector;
                }

                //
                function addCombinator(matcher, combinator, base) {
                    var dir = combinator.dir,
                        checkNonElements = base && dir === "parentNode",
                        doneName = done++;

                    return combinator.first ?
                        // Check against closest ancestor/preceding element
                        function(elem, context, xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    return matcher(elem, context, xml);
                                }
                            }
                        } :

                        // Check against all ancestor/preceding elements
                        function(elem, context, xml) {
                            var data, cache, outerCache,
                                dirkey = dirruns + " " + doneName;

                            // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                            if (xml) {
                                while ((elem = elem[dir])) {
                                    if (elem.nodeType === 1 || checkNonElements) {
                                        if (matcher(elem, context, xml)) {
                                            return true;
                                        }
                                    }
                                }
                            } else {
                                while ((elem = elem[dir])) {
                                    if (elem.nodeType === 1 || checkNonElements) {
                                        outerCache = elem[expando] || (elem[expando] = {});
                                        if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                                            if ((data = cache[1]) === true || data === cachedruns) {
                                                return data === true;
                                            }
                                        } else {
                                            cache = outerCache[dir] = [dirkey];
                                            cache[1] = matcher(elem, context, xml) || cachedruns;
                                            if (cache[1] === true) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        };
                }

                function elementMatcher(matchers) {
                    return matchers.length > 1 ?
                        function(elem, context, xml) {
                            var i = matchers.length;
                            while (i--) {
                                if (!matchers[i](elem, context, xml)) {
                                    return false;
                                }
                            }
                            return true;
                        } :
                        matchers[0];
                }

                function condense(unmatched, map, filter, context, xml) {
                    var elem,
                        newUnmatched = [],
                        i = 0,
                        len = unmatched.length,
                        mapped = map != null;

                    for (; i < len; i++) {
                        if ((elem = unmatched[i])) {
                            if (!filter || filter(elem, context, xml)) {
                                newUnmatched.push(elem);
                                if (mapped) {
                                    map.push(i);
                                }
                            }
                        }
                    }

                    return newUnmatched;
                }

                function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                    if (postFilter && !postFilter[expando]) {
                        postFilter = setMatcher(postFilter);
                    }
                    if (postFinder && !postFinder[expando]) {
                        postFinder = setMatcher(postFinder, postSelector);
                    }
                    return markFunction(function(seed, results, context, xml) {
                        var temp, i, elem,
                            preMap = [],
                            postMap = [],
                            preexisting = results.length,

                            // Get initial elements from seed or context
                            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                            // Prefilter to get matcher input, preserving a map for seed-results synchronization
                            matcherIn = preFilter && (seed || !selector) ?
                            condense(elems, preMap, preFilter, context, xml) :
                            elems,

                            matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || (seed ? preFilter : preexisting || postFilter) ?

                            // ...intermediate processing is necessary
                            [] :

                            // ...otherwise use results directly
                            results :
                            matcherIn;

                        // Find primary matches
                        if (matcher) {
                            matcher(matcherIn, matcherOut, context, xml);
                        }

                        // Apply postFilter
                        if (postFilter) {
                            temp = condense(matcherOut, postMap);
                            postFilter(temp, [], context, xml);

                            // Un-match failing elements by moving them back to matcherIn
                            i = temp.length;
                            while (i--) {
                                if ((elem = temp[i])) {
                                    matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                                }
                            }
                        }

                        if (seed) {
                            if (postFinder || preFilter) {
                                if (postFinder) {
                                    // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                    temp = [];
                                    i = matcherOut.length;
                                    while (i--) {
                                        if ((elem = matcherOut[i])) {
                                            // Restore matcherIn since elem is not yet a final match
                                            temp.push((matcherIn[i] = elem));
                                        }
                                    }
                                    postFinder(null, (matcherOut = []), temp, xml);
                                }

                                // Move matched elements from seed to results to keep them synchronized
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i]) &&
                                        (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

                                        seed[temp] = !(results[temp] = elem);
                                    }
                                }
                            }

                            // Add elements to results, through postFinder if defined
                        } else {
                            matcherOut = condense(
                                matcherOut === results ?
                                matcherOut.splice(preexisting, matcherOut.length) :
                                matcherOut
                            );
                            if (postFinder) {
                                postFinder(null, results, matcherOut, xml);
                            } else {
                                push.apply(results, matcherOut);
                            }
                        }
                    });
                }

                // 生成用于匹配单个选择器组的函数
                // 充当了 selector“tokens” 与 Expr 中定义的匹配方法的串联与纽带的作用，
                // 可以说选择符的各种排列组合都是能适应的了
                // Sizzle 巧妙的就是它没有直接将拿到的词法分析的结果与 Expr 中的方法逐个匹配逐个执行，
                // 而是先根据规则组合出一个大的匹配方法，最后一步执行。但是组合之后怎么执行的
                function matcherFromTokens(tokens) {
                    var checkContext, matcher, j,
                        len = tokens.length,
                        leadingRelative = Expr.relative[tokens[0].type],
                        // 亲密度关系
                        implicitRelative = leadingRelative || Expr.relative[" "],
                        i = leadingRelative ? 1 : 0,

                        // The foundational matcher ensures that elements are reachable from top-level context(s)
                        // 确保这些元素可以在 context 中找到
                        matchContext = addCombinator(function(elem) {
                            return elem === checkContext;
                        }, implicitRelative, true),

                        matchAnyContext = addCombinator(function(elem) {
                            return indexOf.call(checkContext, elem) > -1;
                        }, implicitRelative, true),

                        // 这里用来确定元素在哪个 context
                        matchers = [function(elem, context, xml) {
                            return (!leadingRelative && (xml || context !== outermostContext)) || (
                                (checkContext = context).nodeType ?
                                matchContext(elem, context, xml) :
                                matchAnyContext(elem, context, xml));
                        }];

                    for (; i < len; i++) {
                        if ((matcher = Expr.relative[tokens[i].type])) {
                            matchers = [addCombinator(elementMatcher(matchers), matcher)];
                        } else {
                            matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                            // Return special upon seeing a positional matcher
                            if (matcher[expando]) {
                                // Find the next relative operator (if any) for proper handling
                                j = ++i;
                                for (; j < len; j++) {
                                    if (Expr.relative[tokens[j].type]) {
                                        break;
                                    }
                                }
                                return setMatcher(
                                    i > 1 && elementMatcher(matchers),
                                    i > 1 && toSelector(
                                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                        tokens.slice(0, i - 1).concat({
                                            value: tokens[i - 2].type === " " ? "*" : ""
                                        })
                                    ).replace(rtrim, "$1"),
                                    matcher,
                                    i < j && matcherFromTokens(tokens.slice(i, j)),
                                    j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                    j < len && toSelector(tokens)
                                );
                            }
                            matchers.push(matcher);
                        }
                    }

                    return elementMatcher(matchers);
                }

                // 返回一个终极匹配器 superMatcher
                function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                    // A counter to specify which element is currently being matched
                    var matcherCachedRuns = 0,
                        bySet = setMatchers.length > 0,
                        byElement = elementMatchers.length > 0,
                        // 内嵌 superMatcher
                        //
                        superMatcher = function(seed, context, xml, results, expandContext) {
                            var elem, j, matcher,
                                setMatched = [],
                                matchedCount = 0,
                                i = "0",
                                unmatched = seed && [],
                                outermost = expandContext != null,
                                contextBackup = outermostContext,
                                // We must always have either seed elements or context
                                // 根据参数 seed 、expandContext 和 context 确定一个起始的查询范围
                                // 如果已经定义了初始集合 seed ，就直接用它，可以缩小过滤范围
                                // 如果没有，那只能把整个 DOM 树节点取出来过滤了
                                elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
                                // Use integer dirruns if this is the outermost matcher
                                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

                            // 搜索范围作用域
                            // 可以看出对于优化选择器，最右边应该写一个作用域的搜索范围context比较好
                            if (outermost) {
                                outermostContext = context !== document && context;
                                cachedruns = matcherCachedRuns;
                            }

                            // Add elements passing elementMatchers directly to results
                            // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                            // 开始遍历 seed 种子合集了
                            for (;
                                (elem = elems[i]) != null; i++) {
                                if (byElement && elem) {
                                    j = 0;
                                    while ((matcher = elementMatchers[j++])) {
                                        if (matcher(elem, context, xml)) {
                                            results.push(elem);
                                            break;
                                        }
                                    }
                                    if (outermost) {
                                        dirruns = dirrunsUnique;
                                        cachedruns = ++matcherCachedRuns;
                                    }
                                }

                                // Track unmatched elements for set filters
                                if (bySet) {
                                    // They will have gone through all possible matchers
                                    if ((elem = !matcher && elem)) {
                                        matchedCount--;
                                    }

                                    // Lengthen the array for every element, matched or not
                                    if (seed) {
                                        unmatched.push(elem);
                                    }
                                }
                            }

                            // Apply set filters to unmatched elements
                            matchedCount += i;
                            if (bySet && i !== matchedCount) {
                                j = 0;
                                while ((matcher = setMatchers[j++])) {
                                    matcher(unmatched, setMatched, context, xml);
                                }

                                if (seed) {
                                    // Reintegrate element matches to eliminate the need for sorting
                                    if (matchedCount > 0) {
                                        while (i--) {
                                            if (!(unmatched[i] || setMatched[i])) {
                                                setMatched[i] = pop.call(results);
                                            }
                                        }
                                    }

                                    // Discard index placeholder values to get only actual matches
                                    setMatched = condense(setMatched);
                                }

                                // Add matches to results
                                push.apply(results, setMatched);

                                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                                if (outermost && !seed && setMatched.length > 0 &&
                                    (matchedCount + setMatchers.length) > 1) {

                                    Sizzle.uniqueSort(results);
                                }
                            }

                            // Override manipulation of globals by nested matchers
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                outermostContext = contextBackup;
                            }

                            return unmatched;
                        };

                    return bySet ?
                        markFunction(superMatcher) :
                        superMatcher;
                }

                // 编译函数机制
                // 通过传递进来的 selector 和 match 生成匹配器：
                compile = Sizzle.compile = function(selector, group /* Internal Use Only */ ) {
                    var i,
                        setMatchers = [],
                        elementMatchers = [],
                        cached = compilerCache[selector + " "];

                    // 先看看有没有缓存
                    if (!cached) {
                        // Generate a function of recursive functions that can be used to check each element
                        // 如果没有词法解析过
                        if (!group) {
                            group = tokenize(selector);
                        }
                        i = group.length;
                        // 如果是有并联选择器这里多次等循环
                        while (i--) {
                            // 这里用 matcherFromTokens 来生成对应 Token 的匹配器
                            cached = matcherFromTokens(group[i]);
                            if (cached[expando]) {
                                setMatchers.push(cached);
                            } else {
                                // 普通的那些匹配器都压入了elementMatchers里边
                                elementMatchers.push(cached);
                            }
                        }

                        // Cache the compiled function
                        // 这里可以看到，是通过 matcherFromGroupMatchers 这个函数来生成最终的匹配器
                        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                    }
                    // 把这个终极匹配器返回到 select 函数中
                    return cached;
                };

                function multipleContexts(selector, contexts, results) {
                    var i = 0,
                        len = contexts.length;
                    for (; i < len; i++) {
                        Sizzle(selector, contexts[i], results);
                    }
                    return results;
                }

                // Sizzle 引擎的主要入口函数
                // Expr.find: 主查找函数
                // Expr.filter: 主过滤函数
                // Expr.relative: 块间关系处理函数集
                // 程序走到这里调用了这个函数，说明选择器 selector 非简单的单条规则（如 id 、 tag 、class）
                // 且浏览器不支持 querySelectorAll 接口
                function select(selector, context, results, seed) {
                    var i, tokens, token, type, find,
                        // tokenize 解析出词法格式
                        // tokenize 返回的是一个 Token 序列
                        match = tokenize(selector);

                    // 如果外界没有指定初始集合 seed
                    if (!seed) {
                        // Try to minimize operations if there is only one group
                        // 如果只有一组，就是在单个选择器的情况（即是没有逗号的选择器，并非单条规则）
                        // 可以有一些便捷的处理方式
                        if (match.length === 1) {

                            // Take a shortcut and set the context if the root selector is an ID
                            // 取出选择器 Token 序列
                            tokens = match[0] = match[0].slice(0);

                            // 这么一大串其实简单来说是
                            // 其实 Sizzle 不完全是采用从右到左，如果选择器表达式的最左边存在 #id 选择器
                            // 就会首先对最左边进行查询，并将其作为下一步的执行上下文，
                            // 最终达到缩小上下文的目的，考虑的相当全面
                            if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                                support.getById && context.nodeType === 9 && documentIsHTML &&
                                Expr.relative[tokens[1].type]) {

                                // 如果是 id 选择器，那么以 #id 作为新的上下文
                                context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];

                                // 如果 context 为空，说明新的上下文没找到
                                // 如果 context 这个元素（ selector 第一个 id 选择器）都不存在就不用继续查找
                                if (!context) {
                                    return results;
                                }
                                // 去掉第一个id选择器
                                selector = selector.slice(tokens.shift().value.length);
                            }

                            // Fetch a seed set for right-to-left matching
                            // 从右至左匹配，找出一个 seed 集合
                            // 其中： "needsContext"= new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
                            // 即是表示如果没有一些结构伪类，这些是需要用另一种方式过滤
                            i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;

                            // 从右向左边查询
                            while (i--) {
                                token = tokens[i];

                                // Abort if we hit a combinator
                                // 如果遇到了关系选择器中止
                                //
                                //  > + ~ 空
                                if (Expr.relative[(type = token.type)]) {
                                    break;
                                }

                                // 先看看有没有搜索器find，搜索器就是浏览器一些原生的取DOM接口，简单的表述就是以下对象了
                                //  Expr.find = {
                                //    'ID'    : context.getElementById,
                                //    'CLASS' : context.getElementsByClassName,
                                //    'NAME'  : context.getElementsByName,
                                //    'TAG'   : context.getElementsByTagName
                                //  }
                                if ((find = Expr.find[type])) {
                                    // Search, expanding context for leading sibling combinators
                                    // 尝试一下能否通过这个搜索器搜到符合条件的初始集合seed
                                    if ((seed = find(
                                            token.matches[0].replace(runescape, funescape),
                                            rsibling.test(tokens[0].type) && context.parentNode || context
                                        ))) {

                                        // If seed is empty or no tokens remain, we can return early
                                        // 如果真的搜到了,把最后一条规则去除掉
                                        tokens.splice(i, 1);
                                        selector = seed.length && toSelector(tokens);

                                        // 看看当前剩余的选择器是否为空
                                        if (!selector) {
                                            // 是的话，提前返回结果了
                                            push.apply(results, seed);
                                            return results;
                                        }

                                        // 已经找到了符合条件的seed集合，此时前边还有其他规则，跳出去
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    // Compile and execute a filtering function
                    // Provide `match` to avoid retokenization if we modified the selector above
                    // tokenize(selector) 的结果不止一组，无法使用上述简便的方法
                    // 交由 compile 来生成一个称为终极匹配器
                    // 通过这个匹配器过滤 seed ，把符合条件的结果放到 results 里边
                    // 生成编译函数
                    // var superMatcher = compile( selector, match )
                    // 执行
                    // superMatcher(seed,context,!documentIsHTML,results,rsibling.test( selector ))
                    compile(selector, match)(
                        seed,
                        context, !documentIsHTML,
                        results,
                        rsibling.test(selector)
                    );
                    // 返回结果
                    return results;
                }

                // One-time assignments

                // Sort stability
                support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

                // Support: Chrome<14
                // Always assume duplicates if they aren't passed to the comparison function
                support.detectDuplicates = hasDuplicate;

                // Initialize against the default document
                setDocument();

                // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
                // Detached nodes confoundingly follow *each other*
                support.sortDetached = assert(function(div1) {
                    // Should return 1, but returns 4 (following)
                    return div1.compareDocumentPosition(document.createElement("div")) & 1;
                });

                // Support: IE<8
                // Prevent attribute/property "interpolation"
                // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
                if (!assert(function(div) {
                        div.innerHTML = "<a href='#'></a>";
                        return div.firstChild.getAttribute("href") === "#";
                    })) {
                    addHandle("type|href|height|width", function(elem, name, isXML) {
                        if (!isXML) {
                            return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                        }
                    });
                }

                // Support: IE<9
                // Use defaultValue in place of getAttribute("value")
                if (!support.attributes || !assert(function(div) {
                        div.innerHTML = "<input/>";
                        div.firstChild.setAttribute("value", "");
                        return div.firstChild.getAttribute("value") === "";
                    })) {
                    addHandle("value", function(elem, name, isXML) {
                        if (!isXML && elem.nodeName.toLowerCase() === "input") {
                            return elem.defaultValue;
                        }
                    });
                }

                // Support: IE<9
                // Use getAttributeNode to fetch booleans when getAttribute lies
                if (!assert(function(div) {
                        return div.getAttribute("disabled") == null;
                    })) {
                    addHandle(booleans, function(elem, name, isXML) {
                        var val;
                        if (!isXML) {
                            return (val = elem.getAttributeNode(name)) && val.specified ?
                                val.value :
                                elem[name] === true ? name.toLowerCase() : null;
                        }
                    });
                }

                // 暴露接口
                jQuery.find = Sizzle;
                jQuery.expr = Sizzle.selectors;
                jQuery.expr[":"] = jQuery.expr.pseudos;
                jQuery.unique = Sizzle.uniqueSort;
                jQuery.text = Sizzle.getText;
                jQuery.isXMLDoc = Sizzle.isXML;
                jQuery.contains = Sizzle.contains;


            })(window);
            // String to Object options format cache
            // 创建一个 options 缓存，用于 Callbacks
            var optionsCache = {};

            // Convert String-formatted options into Object-formatted ones and store in cache
            // 生成一个 options 配置对象
            // 使用 optionsCache[ options ] 缓存住配置对象
            // 生成的配置对象就是{once:true, memory:true}
            function createOptions(options) {
                var object = optionsCache[options] = {};
                jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
                    object[flag] = true;
                });
                return object;
            }

            /*
             * Create a callback list using the following parameters:
             *
             *  options: an optional list of space-separated options that will change how
             *          the callback list behaves or a more traditional option object
             *
             * By default a callback list will act like an event callback list and can be
             * "fired" multiple times.
             *
             * Possible options:
             *
             *  once:           will ensure the callback list can only be fired once (like a Deferred)
             *
             *  memory:         will keep track of previous values and will call any callback added
             *                  after the list has been fired right away with the latest "memorized"
             *                  values (like a Deferred)
             *
             *  unique:         will ensure a callback can only be added once (no duplicate in the list)
             *
             *  stopOnFalse:    interrupt callings when a callback returns false
             *
             */
            // options 参数包含四个可选项，可用空格或者, 分隔，分别是
            // once 、 memory 、 unique 、stopOnFalse
            // once -- 确保这个回调列表只执行（ .fire() ）一次(像一个递延 Deferred)
            // memory -- 保持以前的值，将添加到这个列表的后面的最新的值立即执行调用任何回调 (像一个递延 Deferred)
            // unique -- 确保一次只能添加一个回调(所以在列表中没有重复的回调)
            // stopOnFalse -- 当一个回调返回 false 时中断调用
            jQuery.Callbacks = function(options) {

                // Convert options from String-formatted to Object-formatted if needed
                // (we check in cache first)
                // 通过字符串在optionsCache寻找有没有相应缓存，如果没有则创建一个，有则引用
                options = typeof options === "string" ?
                    // 如果传递的是字符串
                    // 可以传递字符串："once memory"
                    // 这里还用optionsCache[ options ]缓存住配置对象
                    // 生成的配置对象就是{once:true, memory:true}
                    (optionsCache[options] || createOptions(options)) :
                    // 如果传递的是对象
                    // 可以传递对象：{once:true, memory:true}
                    jQuery.extend({}, options);

                var
                // Flag to know if list is currently firing
                // 列表中的函数是否正在回调中
                    firing,
                    // Last fire value (for non-forgettable lists)
                    // 最后一次触发回调时传的参数
                    memory,
                    // Flag to know if list was already fired
                    // 列表中的函数是否已经回调至少一次
                    fired,
                    // End of the loop when firing
                    // 需要 fire 的队列长度
                    firingLength,
                    // Index of currently firing callback (modified by remove if needed)
                    // 当前正在firing的回调在队列的索引
                    firingIndex,
                    // First callback to fire (used internally by add and fireWith)
                    // 回调的起点
                    firingStart,
                    // Actual callback list
                    // 回调函数列表
                    list = [],
                    // Stack of fire calls for repeatable lists
                    // 可重复的回调函数堆栈，用于控制触发回调时的参数列表
                    // 如果不是once的，那么stack会keep住fire所需的上下文跟参数（假设称为事件）
                    stack = !options.once && [],

                    // Fire callbacks
                    // 触发回调函数列表
                    // 这个函数是内部使用的辅助函数，私有方法
                    // 它被 self.fire 以及 self.fireWith 调用
                    fire = function(data) {
                        // 如果参数 memory 为true，则记录 data
                        // 如果是 memory 类型管理器
                        // 要记住 fire 的事件 data，以便下次 add 的时候可以重新 fire 这个事件
                        // 看 add 源码最后一段就知道
                        memory = options.memory && data;
                        fired = true;
                        firingIndex = firingStart || 0;
                        firingStart = 0;
                        firingLength = list.length;
                        // 开始 fire,表示正在 fire
                        firing = true;

                        // 遍历回调队列 list
                        for (; list && firingIndex < firingLength; firingIndex++) {
                            // data[ 0 ]是函数执行的上下文，也就是平时的this
                            // 这里看再看下 self.fireWith 传过来的参数 args 的格式
                            // 如果是stopOnFalse管理器，并且回调返回值是false，中断！
                            // list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) 是最终的执行回调的方法
                            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                                memory = false; // To prevent further calls using add
                                break;
                            }
                        }
                        // 结束 fire ，标记回调结束
                        firing = false;

                        if (list) {
                            if (stack) {
                                // 如果事件栈还不为空
                                // 不是 "once" 的情况
                                if (stack.length) {
                                    // 从堆栈头部取出，递归fire
                                    fire(stack.shift());
                                    // 这里是深度遍历，直到事件队列为空
                                }
                                // 深度遍历结束
                                // 等到fire完所有的事件后
                                // 如果是memory类型管理器，下次还能继续
                            } else if (memory) {
                                // 清空队列
                                // "once memory" ，或者 "memory" 情况下 lock 过。
                                list = [];
                            } else {
                                // once
                                self.disable();
                            }
                        }
                    },
                    // Actual Callbacks object
                    // 实际的 callbacks 对象
                    // var callbacks = $.Callbacks() 最后返回的是 sele 对象
                    self = {
                        // Add a callback or a collection of callbacks to the list
                        // 向回调列表中添加一个回调或回调的集合。
                        // 也就是实参可以是一个函数，或者一个函数数组
                        add: function() {
                            // 确保 list 是存在的
                            if (list) {
                                // First, we save the current length
                                // 首先，存储当前回调队列的长度
                                var start = list.length;
                                // 这里是一个立即执行函数，参数 add 是传入的参数
                                // 直接遍历传过来的 arguments 进行 push
                                (function add(args) {
                                    // 遍历这个 参数 集合
                                    jQuery.each(args, function(_, arg) {
                                        // 类型判断
                                        var type = jQuery.type(arg);
                                        // 如果传入的是单个方法
                                        if (type === "function") {
                                            // 不是unique管理器或者当前队列还没有该回调
                                            if (!options.unique || !self.has(arg)) {
                                                // 将回调push入队列
                                                list.push(arg);
                                            }
                                            // 如果传入的是回调的集合数组 或者 array-like
                                            // 因为可以同时add多个回调
                                            // 从这里可以看出add的传参可以有add(fn),add([fn1,fn2]),add(fn1,fn2)
                                            // 同时这里排除掉type为string的情况，其实是提高效率，不加判断也能正确
                                        } else if (arg && arg.length && type !== "string") {
                                            // Inspect recursively
                                            // 递归调用自己，注意这个使用技巧
                                            // 如果是数组，以这个数组为参数再递归调用这个立即执行函数本身
                                            add(arg);
                                        }
                                    });
                                })(arguments);
                                // Do we need to add the callbacks to the
                                // current firing batch?
                                // 如果当前在 firing 当中，那就把需要firing的长度设置成列表长度
                                if (firing) {
                                    firingLength = list.length;
                                    // With memory, if we're not firing then
                                    // we should call right away
                                    // 如果已经 fire 过并且是 memory 类型的管理器
                                    // memory 在这里是上一次 fire 的 [context, args]
                                } else if (memory) {
                                    firingStart = start;
                                    // memory 在上一次 fire 的时候被记录过了
                                    // fire 的时候有这么一段
                                    // memory = options.memory && data;
                                    // memory 作用在这里，没有fire，一样有结果
                                    fire(memory);
                                }
                            }
                            return this;
                        },
                        // Remove a callback from the list
                        // 从队列中移除一个或多个回调
                        remove: function() {
                            // 确保队列是存在的
                            if (list) {
                                // 遍历传入的参数（即是要移除的回调）
                                jQuery.each(arguments, function(_, arg) {
                                    var index;
                                    // inArray(elem,arr,i) -- 在数组中查找指定值并返回它的索引（如果没有找到，则返回-1）
                                    // elem 规定需检索的值, arr 数组, i 可选的整数参数
                                    //
                                    while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                        // splice(index,howmany) 方法向/从数组中添加/删除项目，然后返回被删除的项目
                                        // index -- 必需。整数，规定添加/删除项目的位置
                                        // howmany -- 必需。要删除的项目数量。如果设置为 0，则不会删除项目
                                        // 从回调队列中移除当前查找到的这个方法
                                        list.splice(index, 1);
                                        // Handle firing indexes
                                        // 在函数列表处于firing状态时，最主要的就是维护firingLength和firgingIndex这两个值
                                        // 保证fire时函数列表中的函数能够被正确执行（fire中的for循环需要这两个值
                                        if (firing) {
                                            if (index <= firingLength) {
                                                firingLength--;
                                            }
                                            if (index <= firingIndex) {
                                                firingIndex--;
                                            }
                                        }
                                    }
                                });
                            }
                            return this;
                        },
                        // Check if a given callback is in the list.
                        // If no argument is given, return whether or not list has callbacks attached.
                        // 查找一个给定的回调函数是否存在于回调列表中
                        has: function(fn) {
                            return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
                        },
                        // Remove all callbacks from the list
                        // 清空回调列表
                        empty: function() {
                            list = [];
                            firingLength = 0;
                            return this;
                        },
                        // Have the list do nothing anymore
                        // 禁用回调列表中的回调
                        // 禁用掉之后，把里边的队列、栈等全部清空了！无法再恢复了
                        disable: function() {
                            list = stack = memory = undefined;
                            return this;
                        },
                        // Is it disabled?
                        // 列表是否被禁用
                        disabled: function() {
                            return !list;
                        },
                        // Lock the list in its current state
                        //
                        lock: function() {
                            stack = undefined;
                            if (!memory) {
                                self.disable();
                            }
                            return this;
                        },
                        // Is it locked?
                        locked: function() {
                            return !stack;
                        },
                        // Call all callbacks with the given context and arguments
                        // 以给定的上下文和参数调用所有回调函数
                        fireWith: function(context, args) {
                            // list 不为空
                            // 并且没有 fire 过或者 stack 不为空
                            if (list && (!fired || stack)) {
                                args = args || [];
                                // 把 args 组织成 [context, [arg1, arg2, arg3, ...]]
                                // 可以看到第一个参数是上下文
                                args = [context, args.slice ? args.slice() : args];
                                // 如果当前还在 firing
                                if (firing) {
                                    // 将参数推入堆栈，等待当前回调结束再调用
                                    stack.push(args);
                                } else {
                                    // 否则直接调用
                                    // 这里调用的 fire 是内部使用的 fire 方法，不是self.fire
                                    fire(args);
                                }
                            }
                            return this;
                        },
                        // Call all the callbacks with the given arguments
                        // 以给定的参数调用所有回调函数
                        // 外观模式 self.fire –> self.fireWith –> fire
                        // 最终执行代码是内部私有的 fire 方法
                        fire: function() {
                            self.fireWith(this, arguments);
                            return this;
                        },
                        // To know if the callbacks have already been called at least once
                        // 回调函数列表是否至少被调用一次
                        fired: function() {
                            return !!fired;
                        }
                    };

                return self;
            };

            // 当 jQuery.extend 只有一个参数的时候，其实就是对 jQuery 静态方法的一个扩展
            // jQuery 整体架构对 extend 的解析
            // http://www.cnblogs.com/aaronjs/p/3278578.html
            jQuery.extend({

                // Deferred 方法
                // 生成的 deferred 对象就是 jQuery 的回调函数解决方案
                // $.Deferred() 生成一个 deferred 对象
                // deferred.done(fnc) 指定操作成功时的回调函数
                // deferred.fail(fnc) 指定操作失败时的回调函数
                // deferred.promise() 没有参数时，返回一个新的deferred对象，该对象的运行状态无法被改变；接受参数时，作用为在参数对象上部署 deferred 接口
                // deferred.resolve() 手动改变 deferred 对象的运行状态为"已完成"，从而立即触发 done() 方法
                // deferred.reject() 这个方法与 deferred.resolve() 正好相反，调用后将 deferred 对象的运行状态变为"已失败"，从而立即触发 fail() 方法
                // $.when() 为多个操作指定回调函数
                // deferred.then() 便捷写法，把 done()、fail() 和 progress() 合在一起写
                // deferred.always() 用来指定回调函数的，它的作用是，不管调用的是 deferred.resolve() 还是 deferred.reject()，最后总是执行
                // deferred对象详解 http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
                Deferred: function(func) {
                    // tuples 创建三个 $.Callbacks 对象，分别表示成功，失败，处理中三种状态
                    // 为什么要写成 tuples 这种格式呢，其实是把相同有共同特性的代码的给合并成一种结构，
                    // 然后下面通过 jQuery.each(tuples, function(i, tuple) {} 一次处理
                    var tuples = [
                            // action, add listener, listener list, final state
                            // 三个队列，done|fail|progress 成功|失败|处理中
                            // resolved 对应 已完成
                            // resolved 对象立刻调用 done()方法指定的回调函数
                            // rejected 对应 已失败
                            // rejected 对象立刻调用 fail()方法指定的回调函数
                            // notify 对应 处理中
                            // progress 对象立刻调用 progress()方法指定的回调函数
                            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", jQuery.Callbacks("memory")]
                        ],
                        // 初始状态 ，pending 的意思为待定
                        state = "pending",

                        // 定义一个 promise 对象，坑爹是这个对象里面还有一个 promise 对象需要注意
                        // 具有 state、always、then、primise 方法
                        promise = {
                            // 返回一个 Deferred 对象的当前状态
                            state: function() {
                                return state;
                            },
                            // 这个方法也是用来指定回调函数的
                            // 它的作用是，不管调用的是 deferred.resolve() 还是 deferred.reject() ，最后总是执行
                            always: function() {
                                // deferred 是最终生成的异步队列实例
                                deferred.done(arguments).fail(arguments);
                                // 返回 this，便于链式操作
                                return this;
                            },
                            // 把 done()、fail() 和 progress() 合在一起写
                            // deferred.done(fnDone), fail(fnFail) , progress(fnProgress) 的快捷方式
                            then: function( /* fnDone, fnFail, fnProgress */ ) {
                                // 参数为传入的 done 、 fail 、progress 函数
                                // fns = [fnDone, fnFail, fnProgress]
                                var fns = arguments;

                                // 这里 return jQuery.Deferred(function( newDefer ) {}).promise();
                                // 这里可以看到，又使用了 jQuery.Deferred() 对 then 方法里面的参数又封装了一次
                                return jQuery.Deferred(function(newDefer) {

                                    // 遍历 tuples
                                    jQuery.each(tuples, function(i, tuple) {
                                        // action 表示三种状态 resolve 、reject 、notify 其中之一
                                        // 分别对应 fnDone, fnFail, fnProgress（首先用 isFunction 判断传入的参数是否是方法，注意 && 在这里的用法）
                                        var action = tuple[0],
                                            fn = jQuery.isFunction(fns[i]) && fns[i];

                                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                        // tuple[1] = [ done | fail | progress ]
                                        // 绑定 deferred [done | fail | progress] 方法
                                        deferred[tuple[1]](function() {
                                            // 当前的 this == deferred
                                            var returned = fn && fn.apply(this, arguments);

                                            // 如果回调返回的是一个 Deferred 实例
                                            if (returned && jQuery.isFunction(returned.promise)) {
                                                // 则继续派发事件
                                                returned.promise()
                                                    .done(newDefer.resolve)
                                                    .fail(newDefer.reject)
                                                    .progress(newDefer.notify);
                                                // 如果回调返回的是不是一个 Deferred 实例，则被当做 args 由 XXXWith 派发出去
                                            } else {
                                                newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                            }
                                        });
                                    });
                                    // 销毁变量，防止内存泄漏（退出前手工设置null避免闭包造成的内存占用）
                                    fns = null;
                                }).promise();
                            },
                            // Get a promise for this deferred
                            // If obj is provided, the promise aspect is added to the object
                            // 如果 obj 存在，给 obj 拓展 then | done | fail | progress 等方法，也就是外层的 promise 对象所定义的 state 、always 、then 方法
                            promise: function(obj) {
                                // 注意区分这里的 promise ，这里的 promise 指代的是外层的 promise 对象，而不是里层的 promise 方法
                                // 在这里的 promise 就相当于 this
                                return obj != null ? jQuery.extend(obj, promise) : promise;
                            }
                        },

                        // 最终生成的异步队列实例
                        deferred = {};

                    // Keep pipe for back-compat
                    // 兼容旧版
                    promise.pipe = promise.then;

                    // Add list-specific methods
                    // 初始化三条 Callbacks 队列
                    // 对于 tuples 的 3 条数据集是分 2 部分处理的
                    // 1、将回调函数（ done | fail | progress ）存入函数
                    // 2、给 deferred 对象扩充6个方法 （resolve/reject/notify/resolveWith/rejectWith/notifyWith ）
                    // resolve/reject/notify 是 callbacks.fireWith ，执行回调函数
                    // resolveWith/rejectWith/notifyWith 是 callbacks.fireWith 队列方法引用
                    jQuery.each(tuples, function(i, tuple) {
                        // list 为队列，jQuery.Callbacks() ,创建了一个 callback 对象
                        // stateString 为最后的状态
                        var list = tuple[2],
                            stateString = tuple[3];

                        // promise[ done | fail | progress ] = list.add
                        // tuple[1] == done | fail | progress
                        // 可以看到 done|fail|progress 其实就是 Callbacks 里边的 add 方法
                        promise[tuple[1]] = list.add;

                        // Handle state
                        // 成功或者失败
                        // 如果存在 deferred 最终状态，向 doneList,failList 中的 list 添加 3 个回调函数
                        if (stateString) {

                            list.add(function() {
                                    // state = [ resolved | rejected ]
                                    // 修改最终状态
                                    state = stateString;

                                    // [ reject_list | resolve_list ].disable; progress_list.lock
                                    // 这里用到了 disable ，即是禁用回调列表中的回调
                                    // 禁用对立的那条队列
                                    // 注意 0^1 = 1   1^1 = 0
                                    // 即是成功的时候，把失败那条队列禁用
                                    // 即是成功的时候，把成功那条队列禁用
                                }, tuples[i ^ 1][2].disable,
                                // 锁住当前队列状态
                                tuples[2][2].lock);
                        }

                        // deferred[ resolve | reject | notify ]
                        // tuple[0] == resolve | reject | notify
                        // 可以看到 resolve | reject | notify 其实就是 Callbacks 里边的 fire 方法
                        // 这里还有一点，deferred 对象是暴露了 resolve | reject | notify 三个方法的，而 deferred.promise() 只暴露 done, fail, always 这些个回调函数接口
                        // 之所以通常使用 deferred 是要返回 deferred.promise() ，一是因为 CommonJS promise/A 本来就应当是这样子的；二也是用来避免返回的对象能够主动地调用到 resolve 与 reject 这些关键性的方法
                        deferred[tuple[0]] = function() {
                            deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                            return this;
                        };
                        // deferred[resolveWith | rejectWith | notifyWith] 调用的是 Callbacks 里的 fireWith 方法
                        //
                        deferred[tuple[0] + "With"] = list.fireWith;
                    });
                    // Make the deferred a promise
                    // 这一步之前 promise 和 deferred 绑定了以下方法
                    // deferred[ resolve | reject | notify ]
                    // deferred[ resolveWith | rejectWith | notifyWith ]
                    // promise[ done | fail | progress | then | always | state | promise ]


                    // 合并内部辅助的 promise 的 promise 方法（jQ 同学坑爹，起同样名字）
                    // 扩展 deferred 的 then | done | fail | progress 等方法
                    promise.promise(deferred);

                    // Call given func if any
                    // $.Deferred(func)格式
                    // $.Deferred() 可以接受一个函数名（注意，是函数名）作为参数，$.Deferred() 所生成的 deferred 对象将作为这个函数的默认参数
                    // 例子:
                    // http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
                    // 并且把当前任务的上下文跟参数设置成当前生成的deferred实例
                    if (func) {
                        func.call(deferred, deferred);
                    }

                    // All done!
                    // 返回实例，显而易见 Deferred 是个工厂类，返回的是内部构建的 deferred 对象
                    return deferred;
                },

                // Deferred helper
                // $.when( deferreds ) 提供一种方法来执行一个或多个对象的回调函数，
                // http://www.css88.com/jqapi-1.9/jQuery.when/
                // 参数 deferreds 表示一个或多个延迟对象，或者普通的JavaScript对象
                // 例子:
                // http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
                // 注意到 $.when 是多任务的，当一个任务失败的时候，代表整个都失败了，
                // 即是 $.when(d1, d2).done(fnc) 如果 d1 或者 d2 其中一个失败了，代表整个都失败了，将不会执行fnc
                // 任务是 Deferred 实例，称为异步任务
                // 任务是普通 function 时，称为同步任务
                when: function(subordinate /* , ..., subordinateN */ ) {
                    var i = 0,
                        // 将传入的任务对象变为任务对象数组
                        resolveValues = core_slice.call(arguments),
                        // 任务对象数组的长度
                        length = resolveValues.length,

                        // the count of uncompleted subordinates
                        // 还没完成的异步任务数
                        remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

                        // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                        // 如果任务对象参数列表 resolveValues 只有一个对象，那么 deferred 对象就是它，否则新建一个 deferred 对象
                        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

                        // Update function for both resolve and progress values
                        // 用于更新 成功|处理 中两个状态，
                        // 这里不考虑失败的状态是因为，当一个任务失败的时候，代表整个都失败了。
                        updateFunc = function(i, contexts, values) {
                            return function(value) {
                                contexts[i] = this;
                                values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                                // 处理中，派发正在处理事件
                                if (values === progressValues) {
                                    deferred.notifyWith(contexts, values);
                                    // 成功，并且最后剩余的异步任务为0了
                                } else if (!(--remaining)) {
                                    // 说明所有任务都成功了，派发成功事件出去
                                    // 事件包含的上下文是当前任务前边的所有任务的一个集合
                                    deferred.resolveWith(contexts, values);
                                }
                            };
                        },

                        progressValues, progressContexts, resolveContexts;

                    // add listeners to Deferred subordinates; treat others as resolved
                    // 如果只有一个任务，可以不用做维护状态的处理了
                    // 只有大于1个任务才需要维护任务的状态
                    if (length > 1) {
                        progressValues = new Array(length);
                        progressContexts = new Array(length);
                        resolveContexts = new Array(length);
                        for (; i < length; i++) {
                            if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                                resolveValues[i].promise()
                                    .done(updateFunc(i, resolveContexts, resolveValues))
                                    .fail(deferred.reject)
                                    .progress(updateFunc(i, progressContexts, progressValues));
                            } else {
                                --remaining;
                            }
                        }
                    }

                    // if we're not waiting on anything, resolve the master
                    // 传进来的任务都是同步任务
                    if (!remaining) {
                        deferred.resolveWith(resolveContexts, resolveValues);
                    }

                    // 注意这里有一种情况是，
                    // 如果你不传递任何参数，jQuery.when() 将返回一个 resolved（解决）状态的 promise 对象
                    return deferred.promise();
                }
            });

            // jQuery.support 属性包含表示不同浏览器特性或漏洞的属性集
            // 需要注意的是，官网强烈建议浏览器功能性检测不要使用 jQuery.support 上的属性。而使用比如 Modernizr 这样的外部类库（http://www.css88.com/jqapi-1.9/jQuery.support/）
            // example:
            // $.support.ajax --> true
            jQuery.support = (function(support) {

                var all, a, input, select, fragment, opt, eventName, isSupported, i,
                    div = document.createElement("div");

                // Setup
                // 创建测试用例
                div.setAttribute("className", "t");
                div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

                // Finish early in limited (non-browser) environments
                // 在非浏览器环境提前结束
                all = div.getElementsByTagName("*") || [];
                a = div.getElementsByTagName("a")[0];
                if (!a || !a.style || !all.length) {
                    return support;
                }

                // First batch of tests
                // 第一批次测试
                select = document.createElement("select");
                opt = select.appendChild(document.createElement("option"));
                input = div.getElementsByTagName("input")[0];

                a.style.cssText = "top:1px;float:left;opacity:.5";

                // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
                // 测试是否支持 setAttribute 方法
                // setAttribute 方法需要传入驼峰表示法的参数
                // 在 IE67 中要获得单个属性的值，就必须将属性名转为驼峰形式
                // element.currentStyle.getAttribute(camelCase(style)) -- http://www.cnblogs.com/coco1s/p/5210667.html
                support.getSetAttribute = div.className !== "t";

                // IE strips leading whitespace when .innerHTML is used
                // IE678 的 childNodes 不包含空白文本节点，firstChild 同理
                // nodeType = 3 --- Text
                support.leadingWhitespace = div.firstChild.nodeType === 3;

                // Make sure that tbody elements aren't automatically inserted
                // IE will insert them into empty tables
                // 空 table，IE 会自动生成 tbody，而标准浏览器不会(标准浏览器如果有 tr 存在，也会自动生成 tbody )
                support.tbody = !div.getElementsByTagName("tbody").length;

                // Make sure that link elements get serialized correctly by innerHTML
                // This requires a wrapper element in IE
                // IE678 无法通过 div.innerHTML = '<link />';来插入 link
                support.htmlSerialize = !!div.getElementsByTagName("link").length;

                // Get the style information from getAttribute
                // (IE uses .cssText instead)
                // IE67 无法用 getAttribute 获取 style ，返回 object ，
                // 同理也无法用 setAttribute 设置 style
                support.style = /top/.test(a.getAttribute("style"));

                // Make sure that URLs aren't manipulated
                // (IE normalizes it by default)
                // getAttribute 获取 href 的问题，
                // 详见http://www.cnblogs.com/littledu/articles/2710234.html
                support.hrefNormalized = a.getAttribute("href") === "/a";

                // Make sure that element opacity exists
                // (IE uses filter instead)
                // Use a regex to work around a WebKit issue. See #5145
                // 确定 opacity 属性是否存在，IE678 是通过 filter 滤镜来支持透明度
                support.opacity = /^0.5/.test(a.style.opacity);

                // Verify style float existence
                // (IE uses styleFloat instead of cssFloat)
                // IE678 通过 styleFloat 来获取 float，而标准浏览器用 cssFloat
                support.cssFloat = !!a.style.cssFloat;

                // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
                // checkbox 的默认值是否为 'on' 的测试
                support.checkOn = !!input.value;

                // Make sure that a selected-by-default option has a working selected property.
                // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
                // IE 中，第一个 option 默认不被选中，包括 IE9 依然如此，其他则选中
                support.optSelected = opt.selected;

                // Tests for enctype support on a form (#6743)
                // 测试 form 是否支持 enctype
                // enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码
                support.enctype = !!document.createElement("form").enctype;

                // Makes sure cloning an html5 element does not cause problems
                // Where outerHTML is undefined, this still works
                // IE6 在克隆 HTML5 的新标签元素时 outerHTML 有":"
                support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";

                // Will be defined later
                // 初始化定义，下面进行测试及修改
                support.inlineBlockNeedsLayout = false;
                support.shrinkWrapBlocks = false;
                support.pixelPosition = false;
                support.deleteExpando = true;
                support.noCloneEvent = true;
                support.reliableMarginRight = true;
                support.boxSizingReliable = true;

                // Make sure checked status is properly cloned
                // IE6789 , checked 不能被拷贝
                input.checked = true;
                support.noCloneChecked = input.cloneNode(true).checked;

                // Make sure that the options inside disabled selects aren't marked as disabled
                // (WebKit marks them as disabled)
                // chrome23 已修复
                select.disabled = true;
                // 如果预设的 select 元素中 option 元素不会自动标识为 disabled（oldIE）
                // 那么 optDisabled 会被设定为 true
                support.optDisabled = !opt.disabled;

                // Support: IE<9
                // IE678 不能 delete 节点上的属性
                try {
                    delete div.test;
                } catch (e) {
                    support.deleteExpando = false;
                }

                // Check if we can trust getAttribute("value")
                // getAttribute 检测
                input = document.createElement("input");
                input.setAttribute("value", "");

                // 是否支持 input 的 getAttribute("value")
                support.input = input.getAttribute("value") === "";

                // Check if an input maintains its value after becoming a radio
                // IE下，input 被更换类型后，无法保持前一个类型所设的值
                input.value = "t";
                input.setAttribute("type", "radio");
                support.radioValue = input.value === "t";

                // #11217 - WebKit loses check when the name is after the checked attribute
                input.setAttribute("checked", "t");
                input.setAttribute("name", "t");

                // createdocumentfragment() 方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。
                fragment = document.createDocumentFragment();
                fragment.appendChild(input);

                // Check if a disconnected checkbox will retain its checked
                // value of true after appended to the DOM (IE6/7)
                support.appendChecked = input.checked;

                // WebKit doesn't clone checked state correctly in fragments
                // 检查 fragment 中的 checkbox 的选中状态是否能被复制
                // 这段代码创建了一个 fragment ，并将一个处于选中状态的 checkbox 加入，连续复制两遍后检查 checkbox 是否为选中状态。
                support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

                // Support: IE<9
                // Opera does not clone events (and typeof div.attachEvent === undefined).
                // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
                // 检查复制 DOM Element 时是否会连同 event 一起复制，会则为 false ， 不会则为true
                // IE 中为 false ， FireFox 中为 true
                if (div.attachEvent) {
                    // 首先在 support 中增加属性 noCloneEvent ， 默认值为 true (在上面 Will be defined later 中定义)
                    div.attachEvent("onclick", function() {
                        support.noCloneEvent = false;
                    });
                    // 然后复制 div， 并触发其 “onclick” 事件，触发成功则为将 noCloneEvent 设为 false
                    div.cloneNode(true).click();
                }

                // Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
                // submitBubbles, changeBubbles, focusinBubbles
                // 检查 submit、change、focus 事件是否在“冒泡阶段”触发
                // 实际上只针对 IE 进行检查。因为大多数浏览器（及IE9）使用 addEventListener 附加事件，函数的第三个参数 useCapture （是否在“捕捉阶段”触发事件）既可以为 false ，也可以为 true
                //  而 IE （IE9之前）使用 attachEvent 函数附加事件，该函数无法指定在哪个阶段触发事件，一律都为“冒泡阶段”触发
                for (i in {
                        submit: true,
                        change: true,
                        focusin: true
                    }) {
                    // 通过 setAttribute(eventName, xxx)进行设置
                    div.setAttribute(eventName = "on" + i, "t");
                    // 通过设置的属性（onXXX）存在，可以的话就判断为“冒泡阶段”触发（即只要支持该事件，就判断为“冒泡阶段”触发）
                    support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
                }

                // 克隆出来的div应该不影响原 div, IE678 则会受到影响变为 “” ，等于false
                div.style.backgroundClip = "content-box";
                div.cloneNode(true).style.backgroundClip = "";
                support.clearCloneStyle = div.style.backgroundClip === "content-box";

                // Support: IE<9
                // Iteration over object's inherited properties before its own.
                // 我们知道正常的 for..in.. 循环，首先是从一个对象的实例属性开始的，然后再循环 prototype 中的属性。
                // 但是在 IE9 之前的版本中，这个刚好是反过来的。
                // 所以在这里，jQuery(support) 返回的对象中，第一个 i 应该是 0 ，但是在IE中的是 'andSelf' ，这是 jQuery 中 prototype 里的最后一个属性，
                // 所以最后用 i 与 0 比较，确定 for..in.. 顺序。
                for (i in jQuery(support)) {
                    break;
                }
                support.ownLast = i !== "0";

                // Run tests that need a body at doc ready
                // 运行测试，and 需要 doc ready 环境
                jQuery(function() {
                    var container, marginDiv, tds,
                        divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                        body = document.getElementsByTagName("body")[0];

                    // 不存在 body 标签直接返回
                    if (!body) {
                        // Return for frameset docs that don't have a body
                        return;
                    }

                    // 创建测试用例
                    container = document.createElement("div");
                    container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

                    body.appendChild(container).appendChild(div);

                    // Support: IE8
                    // Check if table cells still have offsetWidth/Height when they are set
                    // to display:none and there are still other visible table cells in a
                    // table row; if so, offsetWidth/Height are not reliable for use when
                    // determining if an element has been hidden directly using
                    // display:none (it is still safe to use offsets if a parent element is
                    // hidden; don safety goggles and see bug #4512 for more information).
                    div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                    tds = div.getElementsByTagName("td");
                    tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
                    isSupported = (tds[0].offsetHeight === 0);

                    tds[0].style.display = "";
                    tds[1].style.display = "none";

                    // Support: IE8
                    // Check if empty table cells still have offsetWidth/Height
                    // 空 table 是否仍然存在 offsetWidth/Height （IE8）
                    support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);

                    // Check box-sizing and margin behavior.
                    div.innerHTML = "";
                    // 注意这里设置了一些样式 box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;
                    // border-box -- 这是IE 怪异模式（Quirks mode）使用的 盒模型。
                    // width 与 height 包括内边距（padding）与边框（border），不包括外边距（margin）
                    // width = border + padding + 内容的宽度，height = border + padding + 内容的高度
                    div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

                    // Workaround failing boxSizing test due to offsetWidth returning wrong value
                    // with some non-1 values of body zoom, ticket #13543
                    jQuery.swap(body, body.style.zoom != null ? {
                        zoom: 1
                    } : {}, function() {
                        // 当 offsetWidth 为 4 ，说明不包括内边距（padding）与边框（border），不支持 boxSizing
                        support.boxSizing = div.offsetWidth === 4;
                    });

                    // Use window.getComputedStyle because jsdom on node.js will break without it.
                    // window.getComputedStyle -- 方法得出所有在应用有效的样式和分解任何可能会包含值的基础计算后的元素的CSS属性值
                    // jQuery 的 CSS() 方法，其底层运作就应用了 getComputedStyle 以及 getPropertyValue 方法
                    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
                    if (window.getComputedStyle) {
                        // safari 下返回 1%，因此等于 false ，而其他浏览器会转换成相应的像素值
                        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
                        // IE 下，如果是怪异模式，width 不等于 4px，需要减去 padding，border
                        support.boxSizingReliable = (window.getComputedStyle(div, null) || {
                            width: "4px"
                        }).width === "4px";

                        // Check if div with explicit width and no margin-right incorrectly
                        // gets computed margin-right based on width of container. (#3333)
                        // Fails in WebKit before Feb 2011 nightlies
                        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                        marginDiv = div.appendChild(document.createElement("div"));
                        marginDiv.style.cssText = div.style.cssText = divReset;
                        marginDiv.style.marginRight = marginDiv.style.width = "0";
                        div.style.width = "1px";

                        // 检查 Margin Right 的计算是否可靠。 各浏览器中都为 true
                        // 上面注释中提到某些老版本的 Webkit 内核的浏览器中为 false
                        // 简单地说，就是将 width 和 marginRight 设为 0 时，获取的 marginRignt 应为 0
                        support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
                    }

                    if (typeof div.style.zoom !== core_strundefined) {
                        // Support: IE<8
                        // Check if natively block-level elements act like inline-block
                        // elements when setting their display to 'inline' and giving
                        // them layout
                        div.innerHTML = "";
                        div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";

                        // inlineBlockNeedsLayout 表示将原本 display 为 block 的 DOM Element 设置为 disylay: inline 时
                        // 是否与 inline 形式的 DOM Element 一致（ offsetWidth 为 2 ）
                        // IE8 及之前的浏览器中为 true ， FireFox 中为 false
                        support.inlineBlockNeedsLayout = (div.offsetWidth === 3);

                        // Support: IE6
                        // Check if elements with layout shrink-wrap their children
                        div.style.display = "block";
                        div.innerHTML = "<div></div>";
                        div.firstChild.style.width = "5px";

                        // shrinkWrapBlocks 表示内部 DOM Element 的样式是否会影响外部 DOM Element 的样式
                        // IE 6 中为 true ， 多数浏览器中为 false
                        support.shrinkWrapBlocks = (div.offsetWidth !== 3);

                        if (support.inlineBlockNeedsLayout) {
                            // Prevent IE 6 from affecting layout for positioned elements #11048
                            // Prevent IE from shrinking the body in IE 7 mode #12869
                            // Support: IE<8
                            body.style.zoom = 1;
                        }
                    }

                    // 销毁测试用例
                    body.removeChild(container);

                    // Null elements to avoid leaks in IE
                    // 在 $(function(){})闭包内部，释放内存，防止内存泄漏
                    container = div = tds = marginDiv = null;
                });

                // Null elements to avoid leaks in IE
                // 释放内存，防止内存泄漏
                all = select = fragment = opt = a = input = null;

                // 返回 support 对象
                return support;
            })({});


            // 下面一块是数据的存储
            // $.data() , $().data()
            // $.removeData() , $().removeData() 等

            // 匹配 {任意字符*} 或者 [任意字符*]
            var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
                // 匹配大写字母
                rmultiDash = /([A-Z])/g;

            // 数据存取方法   （pvt 表示此方法仅在内部使用）
            function internalData(elem, name, data, pvt /* Internal Use Only */ ) {
                // 检查 elem 元素是否可以设置数据
                if (!jQuery.acceptData(elem)) {
                    // 如果参数 elem 不支持设置数据，则立即返回
                    return;
                }

                var ret, thisCache,
                    // 产生jQuery键值随机数 类似于： "11020056177454302087426"
                    // jQuery.expando = (core_version + Math.random()).replace(/\D/g, "");
                    // (core_version + Math.random()) 产生一串随机字符串 "1.10.20.6013481540139765"
                    // replace(/\D/g, "") 去掉非数字
                    internalKey = jQuery.expando,

                    // We have to handle DOM nodes and JS objects differently because IE6-7
                    // can't GC object references properly across the DOM-JS boundary
                    // 元素的 nodeType
                    isNode = elem.nodeType,

                    // Only DOM nodes need the global jQuery cache; JS object data is
                    // attached directly to the object so GC can occur automatically
                    // 只有 DOM 元素需要全局的 jQuery 缓存 cache，
                    // 而如果是 JS 对象，则直接将数据保存在这个对象上
                    cache = isNode ? jQuery.cache : elem,

                    // Only defining an ID for JS objects if its cache already exists allows
                    // the code to shortcut on the same path as a DOM node with no cache
                    // 添加的对象的 key 值，根据元素 elem 的 nodeType 判断
                    // 如果是 Dom 元素，为 elem[internalKey]
                    // 如果是 JS 对象，elem[internalKey] 存在则使用 internalKey ，反之，为 elem[internalKey]
                    id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
                // 可以看到，上面的 cache 和 id 都是要根据 elem 的类型去判断
                // 而 internalData 方法，是适用于对 DOM（doc.getElementById类型）元素 和 JS（var obj={}）对象的



                // Avoid doing any more work than we need to when trying to get data on an
                // object that has no data at all
                // 如果是读取数据，且没有数据，则返回
                if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
                    return;
                }

                // 如果 id 不存在的时候
                if (!id) {
                    // Only DOM nodes need a new unique ID for each element since their data
                    // ends up in the global cache
                    // 只有当 elem 是 DOM 结点的时候，需要添加一个唯一的 ID
                    if (isNode) {
                        // jQuery.guid 全局计数器
                        // 对于 DOM 结点，jQuery.uuid 会自加 1，并附加到 DOM 元素上
                        id = elem[internalKey] = core_deletedIds.pop() || jQuery.guid++;
                        // 不是 DOM 结点，是 JS 对象的话直接使用 internalKey
                    } else {
                        id = internalKey;
                    }
                }

                // 如果 cache[id] 不存在
                if (!cache[id]) {
                    // Avoid exposing jQuery metadata on plain JS objects when the object
                    // is serialized using JSON.stringify
                    // 对于 DOM 如果数据缓存对象不存在，则初始化为空对象 {}
                    // 对于 JS 对象，设置方法 toJSON 为空函数，以避免在执行 JSON.stringify() 时暴露缓存数据
                    // 如果一个对象定义了方法 toJSON(), JSON.stringify() 在序列化该对象时会调用这个方法来生成该对象的 JSON 元素
                    cache[id] = isNode ? {} : {
                        toJSON: jQuery.noop
                    };
                }

                // An object can be passed to jQuery.data instead of a key/value pair; this gets
                // shallow copied over onto the existing cache
                // 如果参数 name 是对象或函数，则批量设置数据
                if (typeof name === "object" || typeof name === "function") {
                    // pvt 表示方法使用于内部
                    if (pvt) {
                        // 对于内部数据，把参数 name 中的属性合并到 cache[id] 中
                        cache[id] = jQuery.extend(cache[id], name);
                    } else {
                        // 对于自定义数据，把参数 name 中的属性合并到 cache[id].data 中
                        cache[id].data = jQuery.extend(cache[id].data, name);
                    }
                }

                // 这是缓存后的数据
                thisCache = cache[id];

                // jQuery data() is stored in a separate object inside the object's internal data
                // cache in order to avoid key collisions between internal data and user-defined
                // jQuery 库会使用 jQuery.data 方法存储一些内部使用的数据，比如 queue 队列，on 事件绑定等等，这些方法都需要存储空间来存储数据
                // 为了区分内部使用的数据和用户定义的数据，jQuery 将内部使用的数据直接存储在 cache[id] 里面，而用户定义的数据则存储在 cache[id].data 中
                // 如果是自定义数据 则将 thisCache 变量指向到 .data 对象中,如果为空则创建一个空对象
                // 这里是个重点，很简单的代码，这里改变了将数据存储的位置
                // 而且这里存储的位置影响到后文 internalRemoveData remove 的位置
                if (!pvt) {
                    if (!thisCache.data) {
                        thisCache.data = {};
                    }

                    thisCache = thisCache.data;
                }

                // 如果 data 不为空，设置键值对 key - value
                if (data !== undefined) {
                    // camelCase 驼峰表示法
                    thisCache[jQuery.camelCase(name)] = data;
                }

                // Check for both converted-to-camel and non-converted data property names
                // If a data property was specified
                // 如果参数 name 是 "string" 类型，则读取单个数据
                // 就是获取返回值了 internalData(elem,'key')
                if (typeof name === "string") {

                    // First Try to find as-is property data
                    // 先尝试读取参数 name 对应的数据
                    ret = thisCache[name];

                    // Test for null|undefined property data
                    // 如果未取到，则把参数 name 转换为驼峰式再次尝试读取对应的数据
                    if (ret == null) {

                        // Try to find the camelCased property
                        // camelCased -- 将 name 变为驼峰表示法
                        ret = thisCache[jQuery.camelCase(name)];
                    }
                } else {
                    // 如果未传入参数 name , data ,则返回数据缓存对象
                    ret = thisCache;
                }

                // 返回 ret 对象
                return ret;
            }

            // 数据对象的移除
            function internalRemoveData(elem, name, pvt) {
                // 检查 elem 元素是否可以设置数据，同上
                if (!jQuery.acceptData(elem)) {
                    return;
                }

                var thisCache, i,
                    // 元素的 nodeType
                    isNode = elem.nodeType,

                    // See jQuery.data for more information
                    // 只有 DOM 元素需要全局的 jQuery 缓存 cache，
                    // 而如果是 JS 对象，则直接将数据保存在这个对象上
                    cache = isNode ? jQuery.cache : elem,

                    // 添加的对象的 key 值，根据元素 elem 的 nodeType 判断
                    // 如果是 Dom 元素，为 elem[internalKey]
                    // 如果是 JS 对象，elem[internalKey] 存在则使用 internalKey ，反之，为 elem[internalKey]
                    id = isNode ? elem[jQuery.expando] : jQuery.expando;

                // If there is already no cache entry for this object, there is no
                // purpose in continuing
                // 如果没有数据那也就不用删除了
                if (!cache[id]) {
                    return;
                }

                // cache[id] != false
                // 有数据存在
                if (name) {

                    // 缓存的位置，指向私有对象还是指向用户自定义的 data
                    thisCache = pvt ? cache[id] : cache[id].data;

                    // 有数据
                    if (thisCache) {

                        // Support array or space separated string names for data keys
                        // 非数组
                        if (!jQuery.isArray(name)) {

                            // try the string as a key before any manipulation
                            // 不是数组的话 则单独进行匹配删除
                            if (name in thisCache) {
                                name = [name];
                            } else {

                                // split the camel cased version by spaces unless a key with the spaces exists
                                // 进行一次驼峰命名转换
                                name = jQuery.camelCase(name);

                                // 如果进行了驼峰命名转换的 name 存在于 thisCache中
                                if (name in thisCache) {
                                    // 转化为数组形式
                                    name = [name];
                                } else {
                                    // 没找到，使用空格分隔 name，也是转化为数组形式
                                    name = name.split(" ");
                                }
                            }
                            // 如果是数组
                        } else {
                            // If "name" is an array of keys...
                            // When data is initially created, via ("key", "val") signature,
                            // keys will be converted to camelCase.
                            // Since there is no way to tell _how_ a key was added, remove
                            // both plain key and camelCase key. #12786
                            // This will only penalize the array argument path.
                            name = name.concat(jQuery.map(name, jQuery.camelCase));
                        }

                        // 经过上面的处理我们看到 jQ 兼容了很多形式上的参数
                        // [key1,key2] "key1 key2" "key1" "key1-name"
                        // 上边的一顿整理，到了这里都是一个数组，执行删除操作
                        // 遍历删除
                        i = name.length;
                        while (i--) {
                            delete thisCache[name[i]];
                        }

                        // If there is no data left in the cache, we want to continue
                        // and let the cache object itself get destroyed
                        // isEmptyDataObject 检测的是 JS 数据对象是否为空
                        // isEmptyObject 检测一个普通对象是否是空对象
                        // 如果数据对象中还有剩余数据则函数执行完毕，return 返回
                        if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                            return;
                        }
                    }
                }

                // 代码执行到这里的时候有两种情况：
                // 1.没有传name参数，意味着要删除所有数据
                // 2.按照传递的name参数删除后,没有数据了
                // See jQuery.data for more information
                // 如果是来删除自定义的数据
                if (!pvt) {
                    //删除 cache[id].data
                    delete cache[id].data;

                    // Don't destroy the parent cache unless the internal data object
                    // had been the only thing left in it
                    // 删除后检测到数据缓存对象还有剩余数据则返回
                    if (!isEmptyDataObject(cache[id])) {
                        return;
                    }
                }

                // 代码执行到这里时：
                // 1.删除的是系统级别数据,
                // 2.已经清空完了用户的缓存数据,而且数据缓存对象还不是空的时候

                // Destroy the cache
                // 销毁缓存
                // 该对象是dom元素
                if (isNode) {
                    jQuery.cleanData([elem], true);

                    // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
                    /* jshint eqeqeq: false */
                } else if (jQuery.support.deleteExpando || cache != cache.window) {
                    /* jshint eqeqeq: true */
                    delete cache[id];

                    // When all else fails, null
                } else {
                    // 其他手段都失败了，将 cache[id] 置为 null
                    cache[id] = null;
                }
            }

            // 下面的就是一些 jQuery 涉及数据存储的操作
            jQuery.extend({
                // 全局的缓存对象
                cache: {},

                // The following elements throw uncatchable exceptions if you
                // attempt to add expando properties to them.
                // 如果你尝试给以下元素添加扩展属性,将抛出“无法捕捉”的异常
                // 这里声明的几个元素对象是不给于数据绑定的
                // applet、embed 和 object 元素是不支持设置 expando 属性的，所以不支持 data 方法
                noData: {
                    "applet": true,
                    "embed": true,
                    // Ban all objects except for Flash (which handle expandos)
                    "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },

                // 检查对象是否已经存储了数据
                hasData: function(elem) {
                    elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
                    return !!elem && !isEmptyDataObject(elem);
                },

                // 给 elem（可是DOM，可以是JS对象）添加 key-value 为 name-data 的数据
                data: function(elem, name, data) {
                    return internalData(elem, name, data);
                },

                // 移除 elem（可是DOM，可以是JS对象）上
                removeData: function(elem, name) {
                    return internalRemoveData(elem, name);
                },

                // For internal use only.
                // 添加或读取一个仅供内部使用的数据
                _data: function(elem, name, data) {
                    return internalData(elem, name, data, true);
                },

                // 删除内部使用的数据数据
                _removeData: function(elem, name) {
                    return internalRemoveData(elem, name, true);
                },

                // A method for determining if a DOM node can handle the data expando
                // 检测一个属性是否可以绑定数据
                // nodeType = 1 -- Element
                // nodeType = 9 -- Document
                acceptData: function(elem) {
                    // Do not set data on non-element because it will not be cleared (#8335).
                    //
                    if (elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9) {
                        return false;
                    }

                    // if(elem.nodeName){
                    //   noData = jQuery.noData[elem.nodeName.toLowerCase()];
                    // }
                    var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];

                    // nodes accept data unless otherwise specified; rejection can be conditional
                    return !noData || noData !== true && elem.getAttribute("classid") === noData;
                }
            });

            // 原型方法拓展
            // 挂载在 jQuery.fn 下的方法是所有 jQuery 对象都能使用的
            // 已经设置了 jQuery.data 为什么还要 jQuery.fn.data 呢
            // 因为 jQuery 的多样性，处理数据存储可以有如下两种方式：
            // $.data(divElement,'name','value') 或者是 $(divElement).data('name','value')
            jQuery.fn.extend({
                // 设置、读取自定义数据，解析HTML5属性data-
                data: function(key, value) {
                    var attrs, name,
                        data = null,
                        i = 0,
                        elem = this[0];

                    // Special expections of .data basically thwart jQuery.access,
                    // so implement the relevant behavior ourselves

                    // Gets all values
                    // 未传入参数的情况
                    if (key === undefined) {
                        // 如果参数 key 是 undefined , 即参数格式是.data(),
                        // 则调用方法 jQuery.data(elem, name, data) 获取第一个匹配元素关联的自定义数据缓存对象，并返回
                        // 这里的 this 指代的是调用 .data() 的对象
                        if (this.length) {
                            data = jQuery.data(elem);

                            // 如果是 DOM 元素
                            if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                                // 拿到 dom 元素的属性列表
                                attrs = elem.attributes;
                                // 遍历
                                for (; i < attrs.length; i++) {
                                    // name为属性名
                                    name = attrs[i].name;

                                    // 先尝试是否有命名为 data-xxxx 的数据
                                    if (name.indexOf("data-") === 0) {
                                        // 取 data-xxxx 后面的 xxxx，即是
                                        // <div data-idName="123"></div> 取其属性 "data-idName" 其中的 idName
                                        name = jQuery.camelCase(name.slice(5));

                                        // 通过 dataAttr 解析 elem 元素身上的 html 标签 "data-" 的值
                                        dataAttr(elem, name, data[name]);
                                    }
                                }
                                jQuery._data(elem, "parsedAttrs", true);
                            }
                        }

                        return data;
                    }

                    // 方法走到这里，说明传入了至少一个参数
                    // 下面分情况处理

                    // Sets multiple values
                    // 如果参数 key 是对象，批量设置 key-value
                    //
                    // $.data(divElement,{
                    //     'name': 'div',
                    //     'age': 19
                    // });
                    //
                    if (typeof key === "object") {
                        return this.each(function() {
                            jQuery.data(this, key);
                        });
                    }


                    // 返回结果
                    return arguments.length > 1 ?

                        // Sets one value
                        // 参数大于一个，那么必然是设置 key-value
                        // 设置单个 key
                        this.each(function() {
                            jQuery.data(this, key, value);
                        }) :

                        // Gets one value
                        // 参数为一个，那么就是获取数据 key
                        // Try to fetch any internally stored data first
                        // 首先应该尝试内部 jQuery.data 是有值，再解析 elem 元素身上的 html 标签 "data-" 的值
                        // 因为 dataAttr(elem, key, data) 里，如果 data !== undefined 是直接返回 data的
                        elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
                },

                // 移除自定义数据
                removeData: function(key) {
                    return this.each(function() {
                        jQuery.removeData(this, key);
                    });
                }
            });

            // 这里函数是用来解析 elem 元素身上的 html 标签 "data-" 的值
            // 如果传入的 data 对象有值的话,则直接返回不进行解析
            function dataAttr(elem, key, data) {
                // If nothing was found internally, try to fetch any
                // data from the HTML5 data-* attribute
                // 如果传入的 data 为空且 elem 是 DOM 元素
                if (data === undefined && elem.nodeType === 1) {

                    // rmultiDash = /([A-Z])/g -- 匹配大写字母
                    // key.replace(rmultiDash, "-$1").toLowerCase() 的意思是将驼峰表示法转化为斜杠表示，即 fontSzie --> font-size
                    // 键名转换，这里的意思是将传入的 name 统一转化为 data-xxx-xxx 的形式
                    var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

                    // 查找是否有该属性
                    data = elem.getAttribute(name);

                    // 找到了，且类型是 String
                    if (typeof data === "string") {
                        try {
                            data = data === "true" ? true :
                                data === "false" ? false :
                                data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                rbrace.test(data) ? jQuery.parseJSON(data) :
                                data;
                        } catch (e) {}

                        // Make sure we set the data so it isn't changed later
                        jQuery.data(elem, key, data);

                        // 木有找到，赋值 undefined
                    } else {
                        data = undefined;
                    }
                }

                // 返回结果
                return data;
            }

            // checks a cache object for emptiness
            // 检查数据缓存对象是否为空
            function isEmptyDataObject(obj) {
                var name;
                for (name in obj) {

                    // if the public data object is empty, the private is still empty
                    if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                        continue;
                    }
                    if (name !== "toJSON") {
                        return false;
                    }
                }

                return true;
            }
            // $.data() $().data() 结束
            // --------------------------------


            // jQuery 的队列管理
            // 这里拓展的 3 个方法是底层方法，是其内部调用的
            jQuery.extend({
                // 静态的底层方法实现入列
                // 方法重载，当只传入 queue(elem, type) 表示返回挂载在 elem 上名字为 type 的队列信息
                // 传入 queue(elem, type, data) 表示 data 入列
                queue: function(elem, type, data) {
                    // 最后返回的队列信息
                    var queue;

                    // elem 存在
                    if (elem) {
                        // 拼接队列名，为
                        // typequeue 或者 fxqueue，不传入队列名则默认为后者
                        // 当是默认队列时，也就是 animate 操作时，队列名为 fxqueue
                        type = (type || "fx") + "queue";

                        // jQuery._data() 添加或读取一个仅供内部使用的数据
                        // 这里是取出队列
                        queue = jQuery._data(elem, type);

                        // Speed up dequeue by getting out quickly if this is just a lookup
                        // 如果有 data ，表示是将 data 入列，反之是取队列，返回上面已经取到的队列即可
                        if (data) {
                            // 查看 queue 是否已经存在，
                            if (!queue || jQuery.isArray(data)) {
                                // 不存在，新建一个队列，并将数据以数组形式 jQuery.makeArray(data)
                                // 使用 jQuery._data 存储起来
                                // jQuery.makeArray() -- 将类似数组或者不是数组的东西强制转换成一个数组然后返回
                                queue = jQuery._data(elem, type, jQuery.makeArray(data));
                            } else {
                                // 已经有该队列了，直接 push 入列
                                queue.push(data);
                            }
                        }

                        // 返回队列
                        // 这个方法主要注意方法的重载，当传入 data 和不传 data 的两种处理方法
                        // 以及队列的存储使用了内部方法 $._data()
                        return queue || [];
                    }
                },

                // 出列，在匹配的元素上执行队列中的下一个函数
                dequeue: function(elem, type) {
                    // 队列名，如果没有传入 type 参数，则赋予默认的队列名 “fx”，也就是 animate 操作
                    type = type || "fx";

                    // 使用 jQuery.queue(elem, type) 取到队列
                    // 上文提到了，当 jQuery.queue(elem, type) 这种传两个参数（不带 data ）的时候，是 get 操队列作
                    var queue = jQuery.queue(elem, type),

                        // 队列长度，注意使用 jQuery.queue(elem, type) 返回的必然是个数组
                        startLength = queue.length,

                        // 弹出队列头部 data （FIFO，先入先出）
                        fn = queue.shift(),

                        // hooks 其实是元素 elem 在数据缓存中的一个属性对象，
                        // 如果我们调用的是 $.dequeue(document,"q1") 的话，
                        // 那么属性对象名就是 q1queueHooks，
                        // 属性值是 {empty: jQuery.Callbacks("once memory").add(function() { data_priv.remove( elem, [ type + "queue", key ] );})}
                        // 因此你使用 hooks.empty，其实就是 q1queueHooks.empty
                        hooks = jQuery._queueHooks(elem, type),

                        // 预处理，触发当前队列的下一个函数
                        next = function() {
                            jQuery.dequeue(elem, type);
                        };

                    // If the fx queue is dequeued, always remove the progress sentinel
            