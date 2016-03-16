/**
 * Created by caoyangkaka on 3/15/16.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');
var re = require('request');
var cheerio = require('cheerio');
http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    // for loging
    console.log('LOG:' + request.method + '; ' + request.url + '; ' + 'TIME: ' + new Date().toString());
    // all about router
    if (urlObj.pathname == '/') {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        fs.readFile('./index.html', function (err, data) {
            response.end(data);
        })
    } else if (urlObj.pathname == '/data') {
        var json = [];
        re('http://www.dafangzi.org/index.php?view=forum&action=thread&fid=2', function (error, res, body) {
            if (!error && res.statusCode == 200) {
                var $ = cheerio.load(body);
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
                re('http://www.dafangzi.org/index.php?view=forum&action=thread&fid=2&page=2', function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        var $ = cheerio.load(body);
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
                        re('http://www.dafangzi.org/index.php?view=forum&action=thread&fid=2&page=3', function (error, res, body) {
                            if (!error && res.statusCode == 200) {
                                var $ = cheerio.load(body);
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
                                response.end(JSON.stringify(json));
                            }
                        });
                    }
                });
            }
        });
    } else {
        var pathname = urlObj.pathname;
        response.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf-8');
        response.setHeader('Cache-Control', 'max-age=2592000');
        fs.exists('.' + pathname, function (exists) {
            if (exists) {
                fs.readFile('.' + pathname, function (err, data) {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }

                })
            } else {
                response.statusCode = 404;
                response.end();
            }

        })
    }
}).listen(8080, 'localhost');