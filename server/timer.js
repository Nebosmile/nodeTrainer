var http = require('http');

var server = http.createServer((req,res)=>{

})
setTimeout(function () {
    server.close();
},2500);

var timer = setInterval(function () {
    console.log(process.memoryUsage());
},1000);
timer.unref();
server.listen(1337,'127.0.0.1');
