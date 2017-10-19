const Router = require('koa-router');
const router = new Router();
const fs = require('fs');

const user_control = require('./controlers/user_control')



//get
router.get('/usercontrol/getusers',user_control.take_users)
router.get('/usercontrol/breakusers',user_control.breake_users)
//post
router.post('/usercontrol/checkuser',user_control.check_user)
router.post('/usercontrol/setuser', user_control.setuser)
router.post('/usercontrol/remove_user', user_control.remove_user)
router.post('/usercontrol/appdate_user', async (ctx, next)=>{

})

router.get('/', async function (ctx) {
    ctx.type ='html';
    ctx.body = fs.createReadStream('public/user.html')
});
router.get('/hello', async function (ctx) {
    ctx.type ='html';
    ctx.body = 'hello'
});

module.exports= router;
