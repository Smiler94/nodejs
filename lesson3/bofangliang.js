var superagent = require('superagent')
var cheerio = require('cheerio')

var urls = [
    'http://www.iqiyi.com/v_19rraakn18.html',//歌手
    'http://www.iqiyi.com/v_19rraa904k.html',//奇葩大会
    'http://www.iqiyi.com/v_19rraaoqx0.html',//爱in思谈
    'http://www.iqiyi.com/v_19rrag3q2g.htmll',//饭饭男友
    'http://www.iqiyi.com/v_19rrag35ec.html',//吃光全宇宙
    'http://www.iqiyi.com/v_19rrb49n7o.html',//跨界冰雪王
    'http://www.iqiyi.com/v_19rrb6lu48.html',//最强大脑
    'http://www.iqiyi.com/v_19rrb57vxw.html',//王牌对王牌
    'http://www.iqiyi.com/v_19rrb58lh4.html',//二十四小时
    'http://www.iqiyi.com/v_19rrb4gvyw.html',//熟悉的味道
    'http://www.iqiyi.com/v_19rrb58ehk.html',//越野千里
    'http://www.iqiyi.com/v_19rrb490es.html',//闪亮的爸爸
    'http://www.iqiyi.com/v_19rrb46nvs.html',//奇葩说
    'http://www.iqiyi.com/v_19rrb49384.html',//高能少年团
    'http://www.iqiyi.com/v_19rrb49gmw.html',//天生是优我
]
urls.forEach(function(url){
    superagent.get(url).end(function (err, res) {
        var $ = cheerio.load(res.text)
        var res = res.text.match(/sourceId:[0-9]{1,}/)
        var sourceId = res[0].replace('sourceId:','')
        var source_url = 'http://cache.video.qiyi.com/jp/sdvlst/6/'+ sourceId+'/?categoryId=6&sourceId='+ sourceId
        var count = 0;
        var title = $('#widget-videosourceName').text()
        var channel = ''
        superagent.get(source_url).end(function (err, res) {
            var result = err.rawResponse.replace('var tvInfoJs=','')
            var a = result.match(/"tvQipuId":[0-9]{9}/g, result)
            var ids = []
            a.forEach(function(id) {
                ids.push(id.replace('"tvQipuId":',''))
            })
            var count_url = 'http://cache.video.qiyi.com/jp/pc/'+ids.join(',')+'/'
            superagent.get(count_url).end(function(err, res) {
                var counts = eval(trim(err.rawResponse.replace('var tvInfoJs=','')))
                ids.forEach(function(id ,idx){
                    count += counts[idx][id]
                })
                new_item = {
                    title: title,
                    channel: channel,
                    total: ids.length,
                    count: count ,
                    // url : url
                }
                console.log(new_item)
            })
        })
    })
})


function trim(str)
{
    return str.replace(/(^\s*)|(\s*$)|([\r\n])|(\ +)/g, "");
}