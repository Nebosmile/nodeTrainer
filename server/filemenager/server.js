var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    var requrl = url.parse(req.url, true)
    console.log(req.url);
    switch (req.url) {
        case '/save_file':
            save_file(req, res);
            break;
        case '/read_file':
            reade_file(req, res);
            break;
        case '/remove_file':
            remove_file(req, res);
            break;
        default:
            res.statusCode = 404;
            res.end('Not found')
    }

}).listen(3000);

function read_file(req, res) {
    var length = 0;
    req.on('data', function(chunk) {
        console.log('its data');
        // ничего не делаем с приходящими данными, просто считываем
        length += chunk.length;
        if (length > 2) {
            res.statusCode = 413;
            res.end("File too big");
        }
    }).on('end', function() {
        res.end('read_file');
    });
}
function save_file(req, res) {
    const max_size = 126 * 1024;
    const file = fs.createWriteStream('img.jpg', {flags: 'wx'});
    var activeSize = 0;
    console.log(max_size);
    console.log(req.headers['content-length']);

    file.on('error', (err) => {
        if (err.code == 'EEXIST') {
            res.statusCode = 409;
            res.end('file already exist.');
            console.error(err);
        }else {
            res.statusCode = 500;
            res.end('Server error.');
            console.error(err);
        }

    }).on('close', () => {
        res.statusCode = 200;
        res.end("file saved")
    });

    req.on('data', (chunk) => {

        activeSize += chunk.length;
        if (activeSize > max_size) {
            res.statusCode = 413;
            res.end("The file is so big");
            file.destroy();

            fs.unlink('img.jpg', (err)=>{
                if(err){
                    console.error(err);
                }
            })
        }
    }).pipe(file);

    req.on('close',()=>{
        file.destroy();
        // fs.unlink('img.jpg', (err)=>{
        //     if(err){
        //         console.error(err);
        //     }
        // });
    })


}
function remove_file(res) {
    res.end('remove_file')
}
