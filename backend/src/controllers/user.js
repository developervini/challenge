const User = require('../models/user')
const jwt = require('jwt-simple')
const moment = require('moment')

class UserController {
    login(req, res) {
        User.findOne({ username: req.body.username, password: req.body.password }, (error, user) => {
            if (error)
                res.json({ error: error })

            if (user) {
                var token = jwt.encode({
                    iss: '1',
                    exp: moment().add(8, 'hours').valueOf()
                }, 'poatek-jwt')

                res.json({
                    token: token,
                    user: user
                })
            } else {
                res.json({
                    msg: 'Username or password incorrect',
                })
            }
        })
    }
}

const controller = new UserController()
module.exports = controller