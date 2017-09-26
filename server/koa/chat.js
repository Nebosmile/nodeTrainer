var clients = [];

exports.subscribe =  function(ctx) {
    return new Promise(function functionName(resolve, reject) {
        clients.push(ctx)
    })

};

exports.publish = function(message, ctx) {
  console.log("publish '%s'", message);
  clients.forEach(function(res_ctx) {
    console.log("send to client");
    res_ctx.status =200;
    res_ctx.res.end(message)
    // res.res.end(message)
    // console.log(res.res);
    // res.res.end('its ans' +message);
  });
  ctx.body='ok'

  clients = [];
  return ctx;
};

setInterval(function() {
  console.log(clients.length);
}, 5000);
