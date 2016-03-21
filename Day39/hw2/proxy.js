var http = require('http');
var fs = require('fs');
var bodyParser = require('./bodyParser');
var proxy = require('./request');

http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    } else if (req.url == '/reg') {
        bodyParser(req, function (result) {
            proxy({
                host: 'localhost',
                port: 8080,
                path: '/',
                method: 'POST'
            }, result, function (response) {
                res.end(response);
            });
        })
    }
}).listen(9090);
