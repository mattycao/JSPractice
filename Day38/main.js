/**
 * Created by caoyangkaka on 3/15/16.
 */
var request = require('request');
var cheerio = require('cheerio');
request('http://www.dafangzi.org/index.php?view=forum&action=thread&fid=2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        var $ = cheerio.load(body);
        $('.listtable td[align="left"] a').each(function(i, elem) {
            console.log($(this).text());
        });
    }
});