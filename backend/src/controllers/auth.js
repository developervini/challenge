const jwt = require('jwt-simple')
const moment = require('moment')

exports.login = function (req, res) {
    if (req.body.username == 'admin' && req.body.password == 'admin') {
        var token = jwt.encode({
            iss: '1',
            exp: moment().add(8, 'hours').valueOf()
        }, 'welike-jwt');

        res.json({
            token: token,
            user: { name: 'Manager' }
        });

    }

    res.json({ msg: 'Sorry, try again!', status: 'warning' });
};