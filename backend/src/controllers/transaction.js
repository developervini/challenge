//const User = require('../models/user')

class TransactionController {
    list(req, res) {
        res.json({
            msg: 'List of transaction',
        })
    }

    new(req, res) {
        res.json({
            msg: 'New transaction',
        })
    }
}

const controller = new TransactionController()
module.exports = controller