var User = require('./user')
var db =require('./db');
db.connect();


let i = 0;

    var vasya = new User('Vasya');
    var petya = new User('Peto1');
    console.log(vasya.hello(petya));
    console.log(db.getPhrase('Run succesfull'));



var expo = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf8');
  i+=10;
  res.end(`Hello World\n ${i} ${vasya.hello(petya)}`);

}

module.exports = expo;
