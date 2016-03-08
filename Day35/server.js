/**
 * Created by caoyangkaka on 3/8/16.
 */
//导入核心模块http
var http = require('http');
/**
 * 1. 能在特定的IP 特定端口上监听 客户端的请求
 * 2. 当请求到来的时候能执行监听函数，并返回响应
 *
 * 创建一个服务器
 * 指定监听函数 每当有客户端请求到来的时候执行的函数
 * request 代表客户端的请求，可以从中获取请求过来的信息
 * response 代表向客户端发的响应，可以通过它向客户端发响应
 *
 */
var fs = require('fs');
var mime = require('mime');
var path = require('path');
//node亲生的模块，帮助我们解析请求中的URL的
var url = require('url');
var users = [];
var server = http.createServer(function (request, response) {
    //把url转成url对象
    var urlObj = url.parse(request.url, true);

    if (urlObj.pathname == '/') {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        fs.readFile('./spa.html', function (err, data) {
            response.end(data);
        })
    } else if (urlObj.pathname == '/register') {
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
        request.on('end', function () {
            var cUser = JSON.parse(str);
            if(users.every(function(user) {
                return user.username !== cUser.username;
            })) {
                users.push(cUser);
            }
            (JSON.parse(str));
            //最后返回用户列表
            response.end(str);
        })
    } else if (urlObj.pathname == '/search') {
        var name = urlObj.query.username;
        users.forEach(function (user) {
            if (user.username === name) {
                response.end(JSON.stringify(user));
            }
        });
        response.end();
    } else if (urlObj.pathname == '/update') {
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
        //当所有的数据全部接收完毕的时候会会触发end事件，这时请求体的数据就接收完整了
        request.on('end', function () {
            console.log(str);
            //转成对象追加到用户列表里
            var cUser = JSON.parse(str);
            users.forEach(function (user) {
                if (user.username === cUser.username) {
                    user.age = cUser.age;
                    response.end(JSON.stringify(user));
                }
            });
            //最后返回用户列表
            response.end('No change');
        })
    } else if (urlObj.pathname == '/delete') {
        var name = urlObj.query.username;
        users.forEach(function (user) {
            if (user.username === name) {
                users.splice(users.indexOf(user), 1);
                console.log(user);
                console.log(users);
                response.end(JSON.stringify(user));
            }
        });
        response.end();
    } else if(urlObj.pathname == '/all') {
        response.end(JSON.stringify(users));
    } else {
        var pathname = urlObj.pathname;
        response.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
        fs.exists('.'+pathname,function(exists){
            if(exists){
                fs.readFile('.'+pathname,function(err,data){
                    //如果读取文件出错了，则也报404错误
                    if(err){
                        response.statusCode = 404;
                        response.end();
                    }else{
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }

                })
            }else{
                response.statusCode = 404;
                response.end();
            }

        })
    }
});
//在8080端口上进行监听 ，主机名是localhost
// 0 - 65535
// ps -ef | grep node
server.listen(8080, 'localhost');