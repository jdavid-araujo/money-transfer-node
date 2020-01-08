const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Account = require('../model/account');

exports.createAccount = (req, res, next) => {
    const errors = ValidityState(req);

    if (!errors.isEmpty()) {

    }
    
    const owner = req.body.owner;
    const balance = req.body.balance;

    const account = new Account({
        owner: owner,
        balance: balance
    });

    account
        .save()
        .then(result => {
            res.statu(201);
        })
};