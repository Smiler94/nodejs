var superagent = require('superagent')
var cheerio = require('cheerio')

var urls = [
    'https://v.qq.com/x/cover/kruhigtunugwbab/x0023osxaj9.html',//最强大脑
    'https://v.qq.com/x/cover/4n8r5plkg2t1sb5/v0022zox2oi.html',
    'https://v.qq.com/x/cover/i6hjg9s9hjsjw95/t0023yqrxsc.html',
    'https://v.qq.com/x/cover/05x8e8vlm5snc72/j00230hndkk.html',
    'https://v.qq.com/x/cover/87jky8z3mz9e0o7/b0023ac3im8.html',
    'https://v.qq.com/x/cover/nbsljfz1fkvmdao/g0023ykibaq.html',
    'https://v.qq.com/x/cover/4ouos7mp4jkr14m/y0023k9suci.html',
    'https://v.qq.com/x/cover/zd8gebdiid269c6/o00230b2yvz.html',
    'https://v.qq.com/x/cover/pngwi7jiyp3sw0b/w00224hx300.html',
    'https://v.qq.com/x/cover/9b9x1xqtag90i8o/d002378iabz.html',
    'https://v.qq.com/x/cover/kruhigtunugwbab/x0023osxaj9.html'
]
urls.forEach(function(url){
    superagent.get(url).end(function (err, res) {
        var $ = cheerio.load(res.text)
        var total = 0;
        var count = 0;
        $('.mod_playlist').eq(0).find('.list_item .figure .figure_meta .figure_count .num').each(function(idx ,element) {
            $element = $(element)
            total += parseInt($element.text().replace('万','')) * 10000
            count ++
        })
        console.log({
            title: $('.album_title').text(),
            channel: '',
            total: total,
            count: count
        })
    })
})