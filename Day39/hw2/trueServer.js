var http = require('http');
var list = [];
http.createServer(function (req, res) {
    var result = '';
    req.on('data', function (data) {
        result += data;
    });
    req.on('end', function (data) {
        list.push(JSON.parse(result));
        res.end(JSON.stringify(list));
    });
}).listen(8080);