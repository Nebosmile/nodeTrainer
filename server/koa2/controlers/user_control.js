const User = require('../schemas/user_schema');
const mongoose = require('mongoose');
var database= require('../config')
mongoose.connect(database.db,{
    'useMongoClient':true,
});


module.exports={
    async take_users(ctx) {
        var answer = await User.find({})
        // console.log(answer[answer.length-1].passwordHash.toString('hex'));
        ctx.type='json'
        ctx.body =answer;
    },
    async setuser(ctx) {
        console.log(ctx.request.body);
        var user = new User({
            name:ctx.request.body.name,
            surname:ctx.request.body.surname,
            nickname:ctx.request.body.nickname,
            gender:ctx.request.body.gender,
            age:ctx.request.body.age,
            password:ctx.request.body.password
        });
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
    },
    async remove_user(ctx) {
        console.log('remove_user');
        var answer = await User.remove({'_id':ctx.request.body._id})
        console.log(answer);
        ctx.type='json'
        ctx.body =answer;
    },
    async check_user(ctx) {
        console.log('check_user');
        var hash;
        console.log(ctx.request.body);
        await User.findOne({nickname:ctx.request.body.nickname}, (err, user) => {
          if (err) {
            return done(err);
          }
          hash = user.checkPassword(ctx.request.body.password);
          console.log(hash);
        })

        ctx.type='text';
        ctx.body =hash;
        // var answer = await User.find({nickname:ctx.request.body.nickname,hash})
        // ctx.type='json';
        // ctx.body ='check_user';
    },
    async breake_users(ctx) {
        ctx.body='breake'
    },

}
