var http = require('http');
var fs = require('fs');
var url = require('url')

var server = http.createServer((req,res)=>{

    res.setHeader('Access-Control-Allow-Origin','*')
    // res.writeHead(200, {'Access-Control-Allow-Origin':'*'
    // });

    var requrl =url.parse(req.url, true);
    // console.log(requrl);
    switch (requrl.path){
        case '/save_file':
            save_file(req,res)
            break;
        default:
        res.end('not valid link');
    }
}).listen(3000);


function save_file(req, res){
    var max_size = 120*1024;
    var actualsize = 0;
    var filePath = 'new_img.jpg'
    var file;

    fs.exists(filePath, (data)=>{
        if(data != true){
            var file = fs.createWriteStream(filePath);
            req.pipe(file);
            file.on('error',(err)=>{

                    if(!res.headersSent){
                        res.statusCode='500';
                        res.setHeader('Connection', 'close');
                        res.write('Internal error')
                    }

                    fs.unlink(filePath,()=>{
                        res.end('Server error');
                    })


                console.log(err.code);
            })
            file.on('close',()=>{
                res.statusCode='200';
                res.end('file is saved on server')
            })
            req.on('data', (data)=>{

                actualsize += data.length;
                if(actualsize>max_size){
                    res.statusCode='413';
                    console.log('to big');
                    res.end('file is so big');

                    file.destroy();
                    fs.unlink(filePath,(err)=>{
                        if(err){
                            console.log(err.code);
                        }

                    })
                }
            });
        }else{
            res.statusCode='409';
            res.end('file already exist')
        }
    })


    req.on('close',()=>{
        fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err.code);
            }

        })
    })

}
