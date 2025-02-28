
const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    fullname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String
})

let user_db = mongoose.model('user', userSchema)

module.exports = user_db
