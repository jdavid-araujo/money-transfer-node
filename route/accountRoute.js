const express = require('express');
const { body } = require('express-validator/check');

const accountController = require('../controller/accountController');

const router = express.Router();

router.post('/accounts', accountController.createAccount);

module.exports = router;