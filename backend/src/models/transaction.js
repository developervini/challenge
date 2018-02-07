const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

var Transaction = new Schema(
    {
        description: String,
        amount: String,
        payment_type: Number ,
        date: {type: Date, default: Date.now}
    }
)

module.exports = mongoose.model('Transaction', Transaction, 'transaction')