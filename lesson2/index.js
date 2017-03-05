// 引入模块
var express = require('express')
var utility = require('utility')

// 实例化express
var app = express()

// 定义route
app.get('/', function(req, res) {
    // 从req中读取到参数q
    var q = req.query.q
    // 使用utility进行md5加密
    var md5Value = utility.md5(q)
    // 向浏览器输出加密结果
    res.send('the md5 value of ' + q + ' is ' + md5Value)
})
//监听3000端口
app.listen(3000, function (req, res) {
    console.log('app is running at port 3000')
})