var http = require('http');
var bodyParser = require('./bodyParser');

module.exports = function(options,data,callback){
    var request = http.request(options,function(res){
        bodyParser(res,function(result){
            callback(result);
        });
    });

    request.end(data);
}