var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService');
router.post('/urls', jsonParser, function(req,res){//express 强行把app里的object放在了req里，所以下面可以直接访问app里的object
    var longUrl = req.body.longUrl;//拿到Long url
    urlService.getShortUrl(longUrl,function(url){

        res.json(url);

    });

});

router.get("/urls/:shortUrl",function(req,res){
    var shortUrl = req.params.shortUrl;
    urlService.getLongUrl(shortUrl, function(url){
        if(url){
            res.json(url);
        }else{
            res.status(404).send("what????");
        }
    });
});

router.get("/urls/:shortUrl/:info",function(req,res){
    statsService.getUrlInfo(req.params.shortUrl,req.params.info,function(data){
        res.json(data);
    });
});

module.exports = router;