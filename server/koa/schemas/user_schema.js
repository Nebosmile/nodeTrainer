const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        // unique: true
    },
    surname: String,
    nickname: {
        type: String,
        // unique: true,
        required: 'Укажите nickname'
    },
    gender: String,
    age: {
        type: Number
    }
})

module.exports = mongoose.model("User", userSchema);
