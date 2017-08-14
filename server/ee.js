var EventEmitter = require('events').EventEmitter;

const server = new EventEmitter;

server.on('request', function(request){
    request.approved = true;
});

server.on('request', function(request){
    console.log(request);
    console.log(process.memoryUsage().heapUsed);
});

server.emit('request', {from:'Клиент'});

server.emit('request', {from:'Еще Клиент'})
