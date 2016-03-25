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
        cb(null, 'public/images');
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        console.error(file);
        cb(null, Date.now() + '.' + file.mimetype.slice(file.mimetype.indexOf('/') + 1));
    }
});

var upload = multer({storage: storage});

router.get('/add', middleware.checkLogin, function (req, res) {
    res.render('article/add', {title: '发表文章', article: {}});
});

router.post('/add', middleware.checkLogin, upload.single('img'), function (req, res) {
    if(req.file){
        req.body.img = path.join('/images',req.file.filename);
    }
    var id = req.body.id;
    var _id = id;
    if(id) {
        var set = {title:req.body.title,content:req.body.content};
        if(req.file)
            set.img = req.body.img;
        Model('Article').update({_id:_id},{$set:set},function(err,result){
            if(err){
                req.flash('error',err);
                return res.redirect('back');
            }
            req.flash('success', '更新文章成功!');
            res.redirect('/');//注册成功后返回主页
        });
    } else {
        req.body.user = req.session.user._id;
        new Model('Article')(req.body).save(function (err, article) {
            if (err) {
                req.flash('error', err.toString()); //放置失败信息
                return res.redirect('/articles/add');
            }
            req.flash('success', '更新文章成功!');  //放置成功信息
            res.redirect('/');//发表文章成功后返回主页
        });
    }

});

router.get('/detail/:_id', function (req, res) {
    Model('Article').findOne({_id: req.params._id}, function (err, article) {
        article.content = markdown.toHTML(article.content);
        res.render('article/detail', {title: '查看文章', article: article});
    });
});

// delete
router.get('/delete/:_id', function (req, res) {
    Model('Article').remove({_id: req.params._id}, function (err, result) {
        if (err) {
            req.flash('error', err.toString());
            res.redirect('back');
        }
        req.flash('success', '删除文章成功!');
        res.redirect('/');//注册成功后返回主页
    });
});

router.get('/edit/:_id', function (req, res) {
    Model('Article').findOne({_id:req.params._id},function(err,article){
        res.render('article/add',{title:'编辑文章',article:article});
    });
});

router.get('/list/:pageNum/:pageSize',function(req, res, next) {
    var pageNum = req.params.pageNum&&req.params.pageNum>0?parseInt(req.params.pageNum):1;
    var pageSize =req.params.pageSize&&req.params.pageSize>0?parseInt(req.params.pageSize):2;
    var query = {};
    var searchBtn = req.query.searchBtn;
    var keyword = req.query.keyword;
    if(searchBtn){
        req.session.keyword = keyword;
    }
    if(req.session.keyword){
        query['title'] = new RegExp(req.session.keyword,"i");
    }

    Model('Article').count(query,function(err,count){
        Model('Article').find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
            articles.forEach(function (article) {
                article.content = markdown.toHTML(article.content);
            });
            res.render('index',{
                title:'主页',
                pageNum:pageNum,
                pageSize:pageSize,
                keyword:req.session.keyword,
                totalPage:Math.ceil(count/pageSize),
                articles:articles
            });
        });
    });
});

module.exports = router;