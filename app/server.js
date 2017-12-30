var express = require('express');
var app = express();
var apiRouter = require('./routes/api');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect('mongodb://user:000@ds157653.mlab.com:57653/tiny_url',{ useMongoClient: true });

//五个中间架
app.use('/node_modules',express.static(__dirname +"/node_modules"));

app.use('/public',express.static(__dirname +"/public"));

app.use(useragent.express());//get request and 解析，then add useragent and 交回去

app.use('/api/v1', apiRouter);//如果是以api/v1打头的，那就用apiRouter处理，这个在哪呢，看在哪引入的

app.use('/', indexRouter);

app.use('/:shortURL', redirectRouter);//注意”：“的使用，不是纯字符串的匹配
//app.get('/',function(req,res){
//  res.send("express again");
//});

app.listen(3000);