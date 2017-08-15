const http = require('http');
const expo = require('serv_end.js')

const hostname = '127.0.0.1';
const port = 3000;

let i =0

const server = http.createServer(expo);

const emit = server.emit;

server.emit =(...args)=>{
    console.log(args[0]);//eventName
    return emit.apply(server, args)
}

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
    var data = new Date();
    console.log(data);
});
