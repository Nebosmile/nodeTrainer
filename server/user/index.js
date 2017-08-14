var db =require('../db');
var log = require('../logger')(module);
var util = require('util');
var obj = {
    a:5,
    b:6,
    inspect:function(){
        return 123;
    }
}
console.log(util.inspect(obj));
console.log("My %s %d %j", "string", "...",{test:'obj'});
function User(name) {
    this.name=name;
}
User.prototype.hello = function (who) {
    return (db.getPhrase('Hello')+ who.name);
};
log('user is required');
module.exports=User;
