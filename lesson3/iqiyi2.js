var superagent = require('superagent')
var cheerio = require('cheerio')
var eventproxy = require('eventproxy')

var sourceId = 1
var root_url = 'http://www.iqiyi.com/zongyi/'
var url = 'http://cache.video.qiyi.com/jp/sdvlst/6/'+ sourceId+'/?categoryId=6&sourceId='+ sourceId

superagent.get(root_url).end(function (err, res) {
    var $ = cheerio.load(res.text)
    var urls = [
        {title : '食在囧途', url: 'http://www.iqiyi.com/a_19rrha0p9x.html'},
        {title : '笑星闯地球', url: 'http://www.iqiyi.com/a_19rrha2twp.html'},
        {title : '熟悉的味道', url: 'http://www.iqiyi.com/a_19rrh94xyt.html'},
        {title : '跨界冰雪王', url: 'http://www.iqiyi.com/a_19rrha2i0t.html'},
        // {title : '歌手', url: 'http://www.iqiyi.com/v_19rraakn18.html'}
    ]

    $('.classes-blcoks').eq(2).find('a').each(function (idx, element) {
        $element = $(element)
        urls.push({
            title: $element.text(),
            url: $element.attr('href')
        })
    })
    var ep = eventproxy()
    urls.forEach(function(item, idx){
        superagent.get(item.url).end(function (err, res) {
            ep.emit('parseUrl', [item.title, item.url, res.text])
        })
    })

    ep.after('parseUrl', urls.length, function(items) {
        items = items.map(function(item) {
            var title = item[0]
            var url = item[1]
            var html = item[2]
            var new_item = {}
            var count = 0;
            var total = 0;
            var channel = '';
            var $ = cheerio.load(html)
            $('.left_col em').each(function(idx, element) {
                if (idx == 1) {
                    var $element = $(element)
                    channel = trim($element.text()).replace('电视台：','')
                }
            })
            
            if (channel != '') {
                var res = html.match(/sourceId: [0-9]{1,}/)
                var sourceId = res[0].replace('sourceId: ','')
                var source_url = 'http://cache.video.qiyi.com/jp/sdvlst/6/'+ sourceId+'/?categoryId=6&sourceId='+ sourceId
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
                return new_item
            } else {
                return {}
            }
        })
    })
})

function trim(str)
{
    return str.replace(/(^\s*)|(\s*$)|([\r\n])|(\ +)/g, "");
}