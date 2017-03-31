var superagent = require('superagent')
var cheerio = require('cheerio')

var urls = [
    'http://www.iqiyi.com/v_19rraakn18.html',
    'http://www.iqiyi.com/v_19rraa904k.html',
    'http://www.iqiyi.com/v_19rraaoqx0.html',
    'http://www.iqiyi.com/v_19rrag3q2g.htmll',
    'http://www.iqiyi.com/v_19rrag35ec.html'
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