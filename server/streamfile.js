var http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function(req, res) {
    // res instanceof http.ServerResponse < stream.Writable
    console.log(req.url);
    if (req.url == '/big.html') {

        var file = new fs.ReadStream('big.html');
        console.log(file);
        sendFile(file, res);

    } else if (req.url == '/') {
        res.end("Empty");
    } else {
        res.end("page not found");
    }
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
    var data = new Date();
    console.log(data);
});

function sendFile(file, res) {

    file.pipe(res);

    file.on('error', function(err) {
        res.statusCode = 500;
        res.end("Server Error");
        console.error(err);
    });

    file.on('open', function() {
        console.log("open");
    })
    file.on('close', function() {
        console.log("close");
    });

    res.on('close', function() {
        file.destroy();
    });

}
