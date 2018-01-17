// 加载express
var express = require('express')
// 设置端口
var port = process.env.PORT || 3000
// 启动web服务器 
var app = express()

app.set('views','./views')
// 设置模板引擎，jade 
app.set('view engine','jade')
// 监听端口
app.listen(port)

console.log('imooc started on port' + port)

// 路由 
// index page
app.get('/',function(req,res){
	res.render('index',{
		title:'imooc 首页'
	})
}) 
// list page
app.get('/movie/list',function(req,res){
	res.render('list',{
		title:'imooc 列表页'
	})
}) 
// detail page
app.get('/admin/:id',function(req,res){
	res.render('detail',{
		title:'imooc 详情页'
	})
}) 
// admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'imooc 后台录入页'
	})
})