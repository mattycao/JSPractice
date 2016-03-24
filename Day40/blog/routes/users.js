var express = require('express');
var router = express.Router();
var middleware = require('../middleware');

/**
 * For user registration
 */
router.get('/reg', middleware.checkNotLogin, function (req, res, next) {
    res.render('user/reg', {title: '注册'});
});

/**
 * For post registration
 */
router.post('/reg', function (req, res) {
    //就是 POST 请求信息解析过后的对象，例如我们要访问 POST 来的表单内的 name="username" 域的值，只需访问 req.body['username'] 或 req.body.username 即可。
    var user = req.body;//
    if (user.password != user.repassword) {
        req.flash('error', '两次输入的密码不一致');
        return res.redirect('/users/reg');
    }
    delete user.repassword; //由于repassword不需要保存，所以可以删除
    user.password = md5(user.password); //对密码进行md5加密
    user.avatar = "https://secure.gravatar.com/avatar/" + md5(user.email) + "?s=48"; //得到用户的头像
    new Model('User')(user).save(function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/users/reg');
        }
        req.session.user = user;//用户信息存入 session
        res.redirect('/');//注册成功后返回主页
    });
});
/**
 * For user registration
 */
router.get('/login', middleware.checkNotLogin, function (req, res, next) {
    res.render('user/login', {title: '登陆'});
});

/**
 * For post registration
 */
router.post('/login', function (req, res) {
    var user = req.body;
    user.password = md5(user.password);
    Model('User').findOne(user, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/users/login');
        }
        req.session.user = user;//用户信息存入 session
        res.redirect('/');//注册成功后返回主页
    });
});

/**
 * For logout on user
 */
router.get('/logout', middleware.checkLogin, function (req, res, next) {
    req.session.user  = null;
    res.redirect('/');
});

function md5(val) {
    return require('crypto').createHash('md5').update(val).digest('hex');
}

module.exports = router;
