/**
 * Created by caoyangkaka on 3/16/16.
 */
var request = require('request');
var cheerio = require('cheerio');
request('http://www.dafangzi.org/index.php?view=forum&action=thread&fid=2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        var $ = cheerio.load(body);
        var json = [];
        $('.listtable td[align="left"] a').each(function (i, elem) {
            var temp = $(this).text().match(/[\d-]+/g);
            json.push(
                {
                    date: temp[0],
                    h1: temp[1],
                    h2: temp[2]
                }
            );
        });
        console.log(JSON.stringify(json));
    }
});