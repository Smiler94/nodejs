// 引入http模块
var http = require('http')

//创建server实例，接收一个回调函数
var server = http.createServer(function(req, res) {
    res.end('this is a http server')
})

// 监听8000端口
server.listen(8000)