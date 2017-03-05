var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')

var ep = new eventproxy()
var urls =[
    "http://www.iqiyi.com/a_19rrh94y4d.html",//闪亮的爸爸
    "http://www.iqiyi.com/a_19rrha0p9x.html",//食在囧途
    "http://www.iqiyi.com/a_19rrha2twp.html",//笑星闯地球
    "http://www.iqiyi.com/a_19rrh93aj1.html",//越野千里
    "http://www.iqiyi.com/a_19rrh90v3h.html",//二十四小时
    "http://www.iqiyi.com/a_19rrh90ve9.html",//王牌对王牌
    "http://www.iqiyi.com/a_19rrha7gsl.html",//最强大脑
    "http://www.iqiyi.com/a_19rrha0p0p.html",//我们十七岁
    "http://www.iqiyi.com/a_19rrh94xyt.html",//熟悉的味道
    "http://www.iqiyi.com/a_19rrha2i0t.html"//跨界冰雪王
]

var url2 = [
    "http://www.iqiyi.com/playlist420116702.html",
    "http://www.iqiyi.com/a_19rrha8omd.html",
    "http://www.iqiyi.com/a_19rrha3fbh.html",
    "http://www.iqiyi.com/a_19rrh91ksd.html",
    "http://www.iqiyi.com/a_19rrh90nzx.html",
    "http://www.iqiyi.com/a_19rrh91ksd.html"
]
ep.after('add_item', urls.length, function(items) {
    items = items.map(function (s_item) {
        var url = s_item[0]
        var html = s_item[1]
        var res = html.match(/sourceId: [0-9]{1,}/)
        // console.log(res)
        // return
        var $ = cheerio.load(html)
        var count = 0;
        var total = 0;
        var channel = '';
        $('.playcount span').each(function(idx, element) {
            var $element = $(element)
            var c = parseInt(trim($element.text()).replace("万",'0000'))
            if (!isNaN(c)) {
                total += c
                count ++
            }
        })
        $('.left_col em').each(function(idx, element) {
            if (idx == 1) {
                var $element = $(element)
                channel = trim($element.text()).replace('电视台：','')
            }
        })
        return ({
            title: $('.main_title a').attr('title'),
            channel: channel,
            count: count ,
            total: total,
            // url : url
        })
    })
    console.log(items)
})

urls.forEach(function(url) {
    superagent.get(url).end(function(err, sres){
        console.log('fetch ' + url + ' successful');
        ep.emit('add_item', [url, sres.text])
    })
})

function trim(str)
{
    return str.replace(/(^\s*)|(\s*$)|([\r\n])|(\ +)/g, "");
}
