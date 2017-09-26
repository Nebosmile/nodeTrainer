const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test',{
    'useMongoClient':true,
});
var db = mongoose.connection;
//////models
var user_model= require('./schemas/user_schema');
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
const Router = require('koa-router');
const router = new Router();






router.get('/js/:filename', async function (ctx) {
    console.log(ctx.params.filename);
    ctx.type ='js';
    ctx.body = fs.createReadStream('js/'+ctx.params.filename)
});
router.post('/setuser', async function(ctx) {
    console.log(';its post');
    try{
        console.log(ctx.request.body);
        // var answer = await JSON.parse(ctx.request.body)
        // ctx.body =answer
        ctx.request.body.age=Number(ctx.request.body.age)
        ctx.body=ctx.request.body
    }catch(e){
        ctx.throw(400, 'not walid json')
    }



    // ctx.body =answer
});
router.get('/hello', async function (ctx) {
    ctx.type ='html';
    ctx.body = 'hello'
});
router.get('/', async function (ctx) {
    ctx.type ='html';
    ctx.body = fs.createReadStream('public/user.html')
});



app.use(router.routes());
app.listen(3000);
