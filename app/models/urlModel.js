var mongoose = require('mongoose');
var Schema = mongoose.Schema; //定义自己的schema

//创建这样一个数据表
var UrlSchema = new Schema({
    longUrl: String,
    shortUrl: String
});

//定义一个model，叫‘urlModel’，用schema来创建model
var urlModel = mongoose.model('urlModel',UrlSchema);

module.exports =  urlModel;