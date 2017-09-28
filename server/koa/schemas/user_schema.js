const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
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
    gender: String,
    age: {
        type: Number
    }
})

module.exports = mongoose.model("User", userSchema);
