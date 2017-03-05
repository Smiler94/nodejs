//引入express模块
var express = require('express')
// 调用express实例，它是一个函数，不带参数调用时，返回express实例
var app = express()

// app本身有很多方法，包括常用的get post put patch delete
// 为访问路径（第一个参数）指定一个handle函数
// 这个函数接受req和res两个对象，分别是请求的request和response
// req对象包含了浏览器传来的各种信息，如query body headers之类
// res对象用于定制我们向浏览器输出的信息 比如header 输出内容等
app.get('/', function(req, res) {
    // console.log(req)
    res.send('hello world')
})

// 定义了app之后 监听本地的3000端口
app.listen(3000, function() {
    console.log('app is listening at port 3000')
})