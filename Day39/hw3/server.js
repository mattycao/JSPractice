/**
 * Created by caoyangkaka on 3/8/16.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');
var user = require('./users.js');

http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var urlPath = urlObj.pathname;
    var method = request.method;
    // for loging
    console.log('LOG:' + request.method + '; ' + request.url + '; ' + 'TIME: ' + new Date().toString());
    // all about router
    if (urlPath == '/') {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        fs.readFile('./spa.html', function (err, data) {
            response.end(data);
        });
    } else if (urlPath == '/user') {
        var result = {
            code: -1,
            msg: 'Wrong',
            data: null
        };
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
        request.on('end', function () {
            switch (method) {
                case 'GET':
                    var qName = urlObj.query.username;
                    if (!qName) {
                        result.data = user.users;
                    } else {
                        result.data = user.queryUser(qName);
                    }
                    result.code = 0;
                    result.msg = 'GET: Got it';
                    response.end(JSON.stringify(result));
                    break;
                case "POST":
                    var newUser = JSON.parse(str);
                    if (user.regUser(newUser)) {
                        result.code = 0;
                        result.msg = "Reg it";
                        result.data = user.users;
                    } else {
                        result.code = 1;
                        result.msg = "POST: Already Existed";
                    }
                    response.end(JSON.stringify(result));
                    break;
                case "DELETE":
                    var qName = urlObj.query.username;
                    if (user.deleteUser(qName)) {
                        result.code = 0;
                        result.msg = "Del it";
                        result.data = user.users;
                    } else {
                        result.code = 1;
                        result.msg = "DELETE: Not existed";
                    }
                    response.end(JSON.stringify(result));
                    break;
                case "PUT":
                    var newUser = JSON.parse(str);
                    if (user.updateUser(newUser)) {
                        result.code = 0;
                        result.msg = "Update it";
                        result.data = user.users;
                    } else {
                        result.code = 1;
                        result.msg = "PUT: Not existed";
                    }
                    response.end(JSON.stringify(result));
                    break;
            }
        })
    } else {
        response.setHeader('Content-Type', mime.lookup(urlPath) + ';charset=utf-8');
        response.setHeader('Cache-Control', 'max-age=2592000');
        fs.exists('.' + urlPath, function (exists) {
            if (exists) {
                fs.readFile('.' + urlPath, function (err, data) {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.end(data);
                    }
                })
            } else {
                response.statusCode = 404;
                response.end();
            }

        })
    }
}).listen(3000, 'localhost');