var UrlModel = require('../models/urlModel');
var redis = require('redis');
var host = process.env.REDIS_PORT_6379_TCP_ADDR ||'127.0.0.1';
var port = process.env.REDIS_PORT_6379_TCP_PORT || '6379';

var redisClient = redis.createClient(port,host);

var encode =[];
var genCharArray = function(start, end){
    var arr= [];
    var i = start.charCodeAt(0);
    var j = end.charCodeAt(0);

    for(;i<=j; i++){
        arr.push(String.fromCharCode(i));
    }
    return arr;
};
encode = encode.concat(genCharArray('a','z'));//数组拼接
encode = encode.concat(genCharArray('A','Z'));
encode = encode.concat(genCharArray('0','9'));

var  getShortUrl = function(longUrl,callback){
     if(longUrl.indexOf('http')== -1){
         longUrl="http://"+longUrl;
     }

     redisClient.get(longUrl,function (err, shortUrl) {
         if(shortUrl){
             callback({
                 longUrl: longUrl,
                 shortUrl: shortUrl
             });
         }else{

             UrlModel.findOne({longUrl:longUrl}, function (err, url) {
                 if(url){
                     callback(url);
                 }else{
                     generateShortUrl(function(shortUrl){//此处的function(shortUrl)是一个callbcak
                         var url = new UrlModel({shortUrl:shortUrl, longUrl:longUrl});
                         url.save();
                         redisClient.set(shortUrl,longUrl);
                         redisClient.set(longUrl,shortUrl);
                         callback(url);
                     });
                 }

             });
         }

     });
};

var generateShortUrl = function(callback){

    UrlModel.find({},function(err,urls){

        callback(convertTo62(urls.length));
    });
};
//用do while 是因为0在JavaScript中是false
var convertTo62 = function(num){
    var result ='';
    do{
        result = encode[num % 62]+result;
        num = Math.floor(num/62);
    }while(num);
    return result;
};


var getLongUrl = function(shortUrl,callback){
    redisClient.get(shortUrl,function (err, longUrl) {
        if(longUrl){
            callback({
                longUrl: longUrl,
                shortUrl: shortUrl
            });
        }else{
            UrlModel.findOne({shortUrl:shortUrl},function(err,url){
                callback(url);//找到了就把它返回去
            });
        }
    });
};

//把local定义的这些变量导出，其他地方才能调用
module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};