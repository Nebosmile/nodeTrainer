const Router = require('koa-router');
const router = new Router();
var User_model= require('./schemas/user_schema');
const fs = require('fs');

router.get('/getusers', async function (ctx,next) {
    var answer = await User_model.find({})
    console.log(answer);
    ctx.type='json'
    ctx.body =answer;
});
router.post('/remove_user', async function (ctx,next) {
    console.log('remove_user');
    var answer = await User_model.remove({'_id':ctx.request.body._id})
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

    try{
        await user.save(function (err, result) {

        })
        ctx.type ='text';
        ctx.body = 'its ok'
    }catch(err){
        if(err.name !='ValidationError') throw err;
        console.log(err);
        ctx.throw(400, err.message);
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


exports.init =(app)=>app.use(router.routes())
