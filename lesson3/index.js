// 引入模块
var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')

var app = express()

app.get('/', function(req, res, next) {
    // 用superagent去读取https://cnodejs.org/的内容
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err)
            }
            // sres.text 里存储着网页的html内容 
            // 将这个html内容传给cheerio.load之后就能得到一个实现了jquery接口的变量
            // 命名为$是出于习惯，也可以是其他名称
            var $ = cheerio.load(sres.text)
            // items数组用于存放我们需要的数据
            var items = []

            // 查看网页源代码我们发现需要的数据是id为topic_list底下class为topic_title的元素
            // 遍历取得这些元素的title和href 
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element)
                // 组成对象加入到items中
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                })
            })

            res.send(items)
        })
})

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000')
})