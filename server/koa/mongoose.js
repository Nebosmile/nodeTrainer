if (process.env.TRACE) {
    require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('./config/default.js');

const path = require('path');
const fs = require('fs');
const  mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/interlayer',{
            "useMongoClient": true,
        })
// mongoose.connect("localhost","interlayer","27017",{
//             "server": {
//                 "socketOptions": {
//                     "keepAlive": 1
//                 }
//             },
//             "useMongoClient": true,
//             "user": "",
//             "pass": ""
//         })
var db = mongoose.connection.useDb('test');
var db2 = mongoose.connection.useDb('interlayer');
mongoose.Promise=Promise

db2.once('open', function () {
    console.log('@ serverconnect complete');
})
db.on('error', function () {
    console.log(error);
})
db.once('open', function () {
    console.log('connect complete');
})

var kittySchema = mongoose.Schema({
    name: String
});

var userShema = mongoose.Schema({

})
var User = mongoose.model('User', userShema)
var gamesShema = mongoose.Schema({

})
var Game = db2.model('Game', gamesShema)

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Petya = new User ({name:'Petro'})
var Kitten = mongoose.model('Kitten', kittySchema);


var fluffy = new Kitten({ name: '111' });
fluffy.speak(); // "Meow name is fluffy"



var a =async function(){

    await fluffy.save(function (err, fluffy) {
      if (err) return console.error(err);
      fluffy.speak();
    });
    // await Petya.save(function (err, fluffy) {
    //   if (err) return console.error(err);
    //
    // });

    await Kitten.find(function (err, kittenyara) {
      if (err) return console.error(err);
      console.log(kittenyara);
    });
    await User.find(function (err, user) {
      if (err) return console.error(err);
      console.log(user);
    });
    await User.find(function (err, user) {
      if (err) return console.error(err);
      console.log(user);
    });
    //  mongoose.connection.db.user.find(function (err, users) {
    //   if (err) return console.error(err);
    //   console.log(users);
    // });


    await Kitten.remove({ name: '111' },function (err) {
        console.log(err);
    })

    await Game.find(function (err, kittens) {
      if (err) return console.error(err);
      console.log(kittens);
    })

}
a()





const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.forEach(handler => require('./handlers/' + handler).init(app));

// can be split into files too
const Router = require('koa-router');

const router = new Router();



router.get('/save', async function(ctx, next) {
    let count = ctx.session.count || 0;
    ctx.session.count = ++count;

    ctx.body = ctx.render('./templates/index.pug', {
        user: 'John',
        count
    });
});
app.listen(3000)
