if (process.env.TRACE) {
    require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs')


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test',{
    'useMongoClient':true,
});
var db = mongoose.connection;
db.once('open', function () {
    console.log('connect complete');
})
mongoose.Promise=Promise;
mongoose.set('debug', true);
//////models


// console.log(user_model);



const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.forEach(function(handler) {
    require('./handlers/' + handler).init(app)
})
// app.use(async (ctx, next) => {
//   console.log(ctx.req);
//
//   await next();
// });

////include router
require('./routers').init(app);


app.listen(3000);
