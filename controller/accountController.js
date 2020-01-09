const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Account = require('../model/account');

exports.getAccounts = (req, res, next) => {
    Account.find()
        .then(accounts => {
            res.status(200).json({
                accounts: accounts
            });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
}

exports.getAccountsById = (req, res, next) => {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error(erros);
        error.statusCode = 422;
        throw error;
      }

    Account.findById(id)
      .then(account => {
          res.status(200).json({
            account: account
          });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}

exports.createAccount = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array())
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    
    const owner = req.body.owner;
    const balance = req.body.balance;
    const createDate = new Date();

    const account = new Account({
        owner: owner,
        balance: balance,
        createDate: createDate
    });

    account
        .save()
        .then(result => {
            res.status(201).json();
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
};