
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    surname:String,
    nickname:{
        type:String,
        unique:true,
        required: 'Укажите nickname',
    },
    gender:String,
    age:{
        type:Number
    }
    },
    {
      timestamps: true
    }

)

module.exports = mongoose.model("User",userSchema);
