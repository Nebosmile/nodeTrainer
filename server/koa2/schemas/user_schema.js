const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const crypto = require('crypto');
mongoose.plugin(beautifyUnique);
const userSchema = mongoose.Schema({
    name: {
        type: String,
        // unique: true
    },
    surname: String,
    nickname: {
        type: String,
        unique: 'Two users cannot share the same username ({VALUE})',
        required: 'Укажите nickname'
    },
    passwordHash:{
        type:String,
        required:true,
    },
    salt: String,
    gender: String,
    age: {
        type: Number
    }
})
userSchema.virtual('password')
.set(function (password) {
    if(password != undefined){
        if (password.length<4) {
            this.invalidate('password', 'Пароль дожен быть минимум 4 ре символа.')
        }
    }
    this.plainPassword = password;
    if(password){
        this.salt = crypto.randomBytes(20).toString('base64');
        this.passwordHash= crypto.pbkdf2Sync(
            password,
            this.salt,
            100000,
            20,
            'sha1'
        ).toString('base64')
        console.log(this.passwordHash);
    }
})
userSchema.methods.checkPassword = function(password) {
  if (!password) return false; // empty password means no login by password
  if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)
  return crypto.pbkdf2Sync(
    password,
    this.salt,
    100000,
    20,
    'sha1'
  ).toString('base64');
};

module.exports = mongoose.model("User", userSchema);
