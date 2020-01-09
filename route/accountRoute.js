const express = require('express');
const { body, param } = require('express-validator');

const accountController = require('../controller/accountController');

const router = express.Router();

router.get('', accountController.getAccounts);

router.get('/:id', 
[
    param('id')
        .notEmpty()
        .withMessage('This value must not be empty')
],
accountController.getAccountsById);

router.post('',
[
    body('owner')
        .notEmpty()
        .withMessage('This value must not be empty'),
    body('balance')
        .isDecimal({ decimal_digits: 2 })
        .withMessage('Only permi 2 decimal digits')
        .notEmpty()
        .withMessage('This value must not be empty')
],
 accountController.createAccount);

module.exports = router;