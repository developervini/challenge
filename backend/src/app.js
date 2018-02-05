const fs = require('fs')
const cors = require('cors')
const express = require('express')
const app = module.exports = express()
const config = require('./config/config')
const bodyParser = require('body-parser')

app.use(cors(config.cors))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/login', (req, res, next) => {
    fs.stat('src/controllers/auth.js', function (err, stat) {
        if (err == null) {
            req.controller = require('./controllers/auth')
            return next()
        }
    })
})

app.use('/:model', function (req, res, next) {
    console.log('Verificar token')
    return next()
})

app.get('/', function (req, res) {
    res.json('Bem-vindo')
})

app.post('/login', (req, res) => {
    req.controller.login(req, res)
})

module.exports = app