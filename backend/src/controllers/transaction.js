const Transaction = require('../models/transaction')
const ObjectId = require('mongoose').mongo.ObjectId

class TransactionController {
    find(req, res) {
        Transaction.findOne({ _id: ObjectId(req.params.id) }, (error, transaction) => {
            if (error)
                res.json({ error: error })
            if (transaction) {
                res.json({
                    transaction: transaction
                })
            } else {
                res.json({
                    msg: 'Not found result',
                })
            }
        })
    }

    list(req, res) {
        Transaction.find((error, transactions) => {
            if (error)
                res.status(500).json({ error: error })

            if (transactions) {
                res.json({
                    transactions: transactions
                })
            } else {
                res.json({
                    msg: 'Not found results',
                })
            }
        })
    }

    create(req, res) {
        Transaction.create(req.body, function (err, transaction) {
            if (err)
                res.status(500).json(err)

            res.json({
                msg: 'Transaction saved',
            })
        })
    }

    edit(req, res) {
        Transaction.findByIdAndUpdate(ObjectId(req.params.id), req.body, { new: true }, function (err, transaction) {
            if (err)
                res.status(500).json(err)

            res.json({
                msg: 'Transaction updated',
            })
        });
    }
}

const controller = new TransactionController()
module.exports = controller