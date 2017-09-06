var http = require('http');
var fs = require('fs');
var url = require('url');


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Access-Control-Allow-Origin':'*'});
    var requrl = url.parse(req.url, true)
    console.log(req.url);
    switch (req.url) {
        case '/save_file':
            save_file(res);
            break;
        case '/read_file':
            reade_file(res);
            break;
        case '/remove_file':
            remove_file(res);
            break;
        default:
            res.statusCode = 404;
            res.end('Not found')
    }

}).listen(3000);

function read_file(req,res) {
    var length = 0;
    req.on('data', function(chunk) {
      // ничего не делаем с приходящими данными, просто считываем
      length += chunk.length;
      if (length > 50 * 1024 * 1024) {
        res.statusCode = 413;
        res.end("File too big");
      }
    }).on('end', function() {
      res.end('read_file');
    });
}
function save_file(res) {
    res.end('save_file')
}
function remove_file(res) {
    res.end('remove_file')
}
