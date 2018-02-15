const data = require('./data')
const mongoose = require('mongoose')
const User = require('../models/user')
mongoose.connect('mongodb://mongodb-poatek:27017/poatek')

// Insert users default
User.find((error, users) => {
    if (users.length <= 0) {
        User.create(data.user, function (err, transaction) {
            if (err)
                console.log({ error: error })
        })
    }
})