if (process.env.TRACE) {
    require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');

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

var User_model= require('./schemas/user_schema');
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





router.get('/getusers', async function (ctx,next) {
    console.log('dfghdh');
    var answer = await User_model.find({})
    console.log(answer);
    ctx.type='json'
    ctx.body =answer;
});
router.get('/js/:filename', async function (ctx) {
    console.log(ctx.params.filename);
    ctx.type ='js';
    ctx.body = fs.createReadStream('js/'+ctx.params.filename)
});
router.post('/setuser', async function(ctx, next) {


    console.log(ctx.request.body);
    var user = new User_model({
        name:ctx.request.body.name,
        surname:ctx.request.body.surname,
        nickname:ctx.request.body.nickname,
        gender:ctx.request.body.gender,
        age:ctx.request.body.age
    });
    console.log('is model');
    await user.save(function (err, result) {
        if(err){
            console.log(err);
        }
        console.log('affter error');
        console.log(result);
    })
    ctx.type ='text';
    ctx.body = 'its ok'
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
