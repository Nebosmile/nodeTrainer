var http = require('http');
var server = new http.Server();
var url=require('url');

server.on('request', function (req,res) {
    console.log(req.method, req.url );
    var urlParsed = url.parse(req.url, true);
    console.log(req.headers);

    if(urlParsed.pathname=='/echo' && urlParsed.query.message){
        res.end(`it is ok. Message is ${urlParsed.query.message}`);
    }else{
        res.statusCode = 404;
        res.end("Page not Found");
    }


});
server.listen(1337,'127.0.0.1');
