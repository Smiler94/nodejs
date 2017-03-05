var superagent = require('superagent')
source_url = 'http://cache.video.qiyi.com/jp/sdvlst/6/205710801/?categoryId=6&sourceId=205710801'
var count = 0
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
        
    })
})
function trim(str)
{
    return str.replace(/(^\s*)|(\s*$)|([\r\n])|(\ +)/g, "");
}