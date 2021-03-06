// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
    require('./libs/trace');
}

var chat = require('./chat');

const Koa = require('koa');
const app = new Koa();

const config = require('./config/default.js');

const path = require('path');
const fs = require('fs');

// app.use(async(ctx,next)=>{
//     console.log(ctx);
//     await next();
// })

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.forEach(handler => require('./handlers/' + handler).init(app));

// can be split into files too
const Router = require('koa-router');

const router = new Router();

router.get('/views', async function(ctx, next) {
    let count = ctx.session.count || 0;
    ctx.session.count = ++count;

    ctx.body = ctx.render('./templates/index.pug', {
        user: 'John',
        count
    });
});

// параметр ctx.params
// см. различные варианты https://github.com/pillarjs/path-to-regexp
//   - по умолчанию 1 элемент пути, можно много *
//   - по умолчанию обязателен, можно нет ?
//   - уточнение формы параметра через regexp'ы
router.get('/user/:user/hello', async(ctx, next) => {
    if (ctx.params.user === 'admin') {

        await next();
        return;
    }

    ctx.throw(403);
}, async function(ctx) {
    ctx.body = "Hello, " + ctx.params.user;
});
router.get('/subscribe', async function(ctx) {
    const answer =await chat.subscribe(ctx);
    // ctx.body =answer
});
router.post('/publish', async function(ctx) {

    try{
        console.log(ctx.request.body);
        var answer = await JSON.parse(ctx.request.body)
    }catch(e){
        ctx.throw(400, 'not walid json')
    }
        chat.publish(answer.message, ctx)


    // ctx.body =answer
});

router.get('/', async function(ctx) {
    // ctx.redirect('/views');
    ctx.type = 'html';
    ctx.body= fs.createReadStream('public/index2.html');


});

app.use(router.routes());

app.listen(config.port);
