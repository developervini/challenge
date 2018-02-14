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
                    msg: 'Not found transaction'
                })
            }
        })
    }

    list(req, res) {
        Transaction.find((error, transactions) => {
            if (error)
                res.json({ error: error })

            if (transactions) {
                res.json({
                    transactions: transactions
                })
            } else {
                res.json({
                    msg: 'Not found results'
                })
            }
        })
    }

    create(req, res) {
        Transaction.create(req.body, function (err, transaction) {
            if (err)
                res.json({ error: error })

            res.json({
                msg: 'Saved transaction'
            })
        })
    }

    edit(req, res) {
        Transaction.findByIdAndUpdate(ObjectId(req.params.id), req.body, { new: true }, function (err, transaction) {
            if (err)
                res.json({ error: error })

            res.json({
                msg: 'Updated transaction'
            })
        });
    }

    delete(req, res) {
        Transaction.remove({ _id: ObjectId(req.params.id) }, function (err, result) {
            if (err)
                res.json({ error: error })
            console.log(result)
            if (result.n > 0) {
                res.json({
                    msg: 'Deleted transaction'
                })
            } else {
                res.json({
                    msg: 'Not found transaction'
                })
            }

        });
    }
}

const controller = new TransactionController()
module.exports = controller