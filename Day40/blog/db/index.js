var mongoose = require('mongoose');
var models = require('./models');
var settings = require('../settings');
mongoose.connect(settings.url);
mongoose.model('User', new mongoose.Schema(models.User));
mongoose.model('Article', new mongoose.Schema(models.Article));
// exports to the global
global.Model = function (type) {
    return mongoose.model(type);
}
global.mConnection = mongoose.connection;