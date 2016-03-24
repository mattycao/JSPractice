/**
 * Created by caoyangkaka on 3/23/16.
 */
var express = require('express');
var router = express.Router();

router.get('/add', function (req, res) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add', function (req, res) {
    req.body.user = req.session.user._id;
    new Model('Article')(req.body).save(function(err,article){
        if(err){
            req.flash('error', '更新文章失败!'); //放置失败信息
            return res.redirect('/articles/add');
        }
        req.flash('success', '更新文章成功!');  //放置成功信息
        res.redirect('/');//发表文章成功后返回主页
    });
});

module.exports = router;