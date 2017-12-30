var express = require('express');
var router = express.Router();
var path = require('path');

var urlService = require('../services/urlService');
var statsService = require('../services/statsService');

router.get('*', function(req,res){
    console.log(req);
   var shortUrl = req.originalUrl.slice(1);//怎么拿到shortURL，第0位不要，不带“/”
   urlService.getLongUrl(shortUrl,function(url){
       if(url){
           res.redirect(url.longUrl);//用expres自带的redirect
           statsService.logRequest(shortUrl,req);
       }else{

           res.sendFile( '404.html', {"root": path.join(__dirname, "../public/views/")});
       }
    });



});

module.exports = router;