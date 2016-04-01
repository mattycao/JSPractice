/**
 * Created by caoyangkaka on 3/24/16.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
//指定文件元素的存储方式
var storage = multer.diskStorage({
    //保存文件的路径
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        console.error(file);
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1))
    }
});

var upload = multer({ storage: storage });



/* GET home page. */
router.post('/', upload.single('img'), function(req, res, next) {
    if(req.file){//如果新上传了文件，那么更新img字段
        console.log('Success!');
    }
    res.end('Good!');
});

module.exports = router;