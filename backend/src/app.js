const fs = require('fs')
const cors = require('cors')
const moment = require('moment')
const jwt = require('jwt-simple')
const db = require('./config/db')
const express = require('express')
const app = module.exports = express()
const config = require('./config/config')
const bodyParser = require('body-parser')

app.use(cors(config.cors))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/:controller', function (req, res, next) {
    if (req.params.controller != 'login') {
        if (req.headers['authorization']) {
            var token = req.headers['authorization']
            var decoded = jwt.decode(token, 'poatek-jwt')

            if (decoded.exp <= Date.now()) {
                res.status(401).json({ msg: 'Your session has expired!', status: 'warning' })
            } else {
                fs.stat('src/controllers/' + req.params.controller + '.js', function (err, stat) {
                    if (err == null) {
                        const controller = require('./controllers/' + req.params.controller)
                        req.controller = controller
                        return next()
                    }
                    res.status(404).json({ error: 'Not found' })
                })
            }
        } else {
            res.json({ msg: "Don't access token!", status: 'warning' })
        }
    } else {
        return next()
    }
})

app.post('/login', (req, res) => {
    fs.stat('src/controllers/user.js', function (err, stat) {
        if (err == null) {
            req.controller = require('./controllers/user')
            req.controller.login(req, res)
        }
    })
})

app.get('/:controller', function (req, res) {
    req.controller.list(req, res)
})

app.post('/:controller', function (req, res) {
    req.controller.create(req, res)
})

app.get('/:controller/:id', function (req, res) {
    req.controller.find(req, res)
})

app.put('/:controller/:id', function (req, res) {
    req.controller.edit(req, res)
})

app.delete('/:controller/:id', function (req, res) {
    req.controller.delete(req, res)
})

module.exports = app