var http = require('http');
var fs = require('fs');
var url = require('url')

var server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, POST, PUT, OPTIONS, TRACE')
    // res.writeHead(200, {'Access-Control-Allow-Origin':'*'
    // });


    console.log(req.method);
    // console.log(requrl);
    switch (req.method) {
        case 'POST':
            save_file(req, res);
            break;
        case 'GET':
            read_file(req, res);
            break;
        case 'DELETE':
            remove_file(req, res);
            break;
        default:
            res.end('not valid link');
    }
}).listen(3000);

function remove_file(req , res){
    var filePath=req.url;
    fs.unlink('.'+filePath, (err) => {
        if (err) {
            if(err.code=='ENOENT'){
            res.statusCode=404;
            res.end('file is not found')
            }
            console.log(err.code);
            return
        }
        res.statusCode=200;
        res.end('file deleted')

    })
}

function read_file(req, res){
        var requrl = url.parse(req.url, true)
        console.log(requrl);
        var filePath=req.url
        var file =fs.createReadStream('.'+filePath);

        file.on('error', (err)=>{
            console.log(err.code);
            if(err.code =='ENOENT'){
                res.statusCode =404;
                res.end('File not found');
            }else{
                res.statusCode =500;
                res.end('server error')
            }

        })
        .pipe(res)


        res.on('close',()=>{
            file.destroy()
        })



}
var filePath = 'new_img.jpg'
function save_file(req, res) {

    var file = fs.createWriteStream(filePath, {flags: 'wx'});
    var max_size = 120 * 1024;
    var actualsize = 0;

    var file;


    file.on('drain',()=>{
        console.log('drain');
    })
    file.on('error', (err) => {

        if (err.code == 'EEXIST') {
            if (!res.headersSent) {
                res.statusCode = 409;
                res.setHeader('Connection', 'close');
                res.end('file already exist.');
                file.destroy();
                console.error(err.code);
                return
            }
        } else {
            res.statusCode = 500;
            res.end('Server error.');
            console.error(err.code);
            file.destroy();
        }

    }).on('close', () => {
        res.statusCode = 200;
        res.end("file saved")
    });

    req.on('data', (data) => {
        setImmediate(()=>{
            console.log('data');
            actualsize += data.length;
            if (actualsize > max_size) {
                if (!res.headersSent) {
                    res.statusCode = '413';
                    res.setHeader('Connection', 'close');
                    console.log('to big');

                    res.end('file is so big');

                    file.destroy();
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.log(err.code);
                        }

                    })
                }


            }
        })

    })
    req.pipe(file);



    req.on('close', () => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err.code);
            }

        })
    })
}
