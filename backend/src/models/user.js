const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

var user = new Schema(
    {
        username: String,
        password: String,
        user_type: String
    }
)

module.exports = mongoose.model('User', user, 'user')