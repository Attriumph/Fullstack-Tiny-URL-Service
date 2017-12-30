var http = require('http');
var fs = require('fs');//file system一个nodejs封装好的包，用于读取硬盘里的数据
http.createServer(function(req,res){ //创建server的时候，会把传这个函数进去，并且把连个参数穿进去

    if(req.url == '/') {
        res.writeHead(200, {"content-Type": "text-html"});
        var html = fs.readFileSync(__dirname + '/index.html');//此时返回的就是一个字符串
        res.end(html);
    }


    if(req.url == '/api') {
        res.writeHead(200, {"content-Type": "application/json"});
        var obj = {
            name:"lingquan",
            age: 23
        };
        res.end(JSON.stringify(obj));//javasript自带的功能
    }

    // res.writeHead(200,{"content-Type": "text-plain"});
    //res.write("hello there");
    //res.end();



    //console.log("sever started");
}).listen(3000);