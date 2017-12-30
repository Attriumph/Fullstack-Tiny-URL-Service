var express = require('express');
var router = express.Router();
var path = require('path');


// 这是已经进入/api/v1之后，然后路径是/urls，我们要做的
router.get('/',  function(req, res){
    res.sendFile( 'index.html', {"root": path.join(__dirname, "../public/views/")});
});


module.exports = router;