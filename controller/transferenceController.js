const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Transaction = require('../model/transaction');

exports.findAll = (req, res, next) => {
    Transaction.find()
        .then(transactions => {
            res.status(200).json({
                transactions: transactions
            });
        }).catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}

exports.findById = (req, res, next) => {
    const id = req.params.id;
    const f = req.query.f;
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;       
    }

    if (f === 't') {
        Transaction.findOne({'toAccount': id})
        then(transaction => {
            res.status(200).json({
                transaction: transaction
            });
        });
    } else {
        Transaction.findOne({'fromAccount': id})
        then(transaction => {
            res.status(200).json({
                transaction: transaction
            });
        });
    }
}

exports.post = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array())
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const fromAccount = req.body.fromAccount;
    const toAccount = req.body.toAccount;
    const amount = req.body.amount;
    const createDate = new Date();

    const transaction = new Transaction({
        fromAccount: fromAccount,
        toAccount: toAccount,
        amount: amount,
        createDate: createDate
    });

    transaction.save()
        .then(result => {
            res.status(201).json();
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}