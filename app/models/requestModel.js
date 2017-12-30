var mongoose = require('mongoose');
var Schema = mongoose.Schema; //定义自己的schema

//创建这样一个数据表
var RequestSchema = new Schema({
    shortUrl: String,
    referer: String,
    platform: String,
    browser: String,
    timestamp: Date
});

//定义一个model，叫‘requestModel’，用schema来创建model
var requestModel = mongoose.model('requestModel',RequestSchema);

module.exports =  requestModel;