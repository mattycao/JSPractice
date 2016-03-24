/**
 * Created by caoyangkaka on 3/23/16.
 */
var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var markdown = require('markdown').markdown;
var path = require('path');
var multer = require('multer');
//指定文件元素的存储方式
var storage = multer.diskStorage({
    //保存文件的路径
    destination: function (req, file, cb) {
        cb(null, '../public/images');
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        console.error(file);
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1));
    }
});

var upload = multer({ storage: storage });

router.get('/add', middleware.checkLogin, function (req, res) {
    res.render('article/add', {title: '发表文章'});
});

router.post('/add', middleware.checkLogin, upload.single('img'), function (req, res) {
    var article = req.body;
    req.body.user = req.session.user._id;
    if (req.file) {
        article.img = '/images/'+req.file.filename;
        console.log('*******=' + req.file);
    } else {
        console.log('********Empty:');
    }
    new Model('Article')(req.body).save(function (err, article) {
        if (err) {
            req.flash('error', '更新文章失败!'); //放置失败信息
            return res.redirect('/articles/add');
        }
        req.flash('success', '更新文章成功!');  //放置成功信息
        res.redirect('/');//发表文章成功后返回主页
    });
});

router.get('/detail/:_id', function (req, res) {
    Model('Article').findOne({_id: req.params._id}, function (err, article) {
        article.content = markdown.toHTML(article.content);
        res.render('article/detail', {title: '查看文章', article: article});
    });
});

module.exports = router;