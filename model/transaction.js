const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    fromAccount: {
        type: Number,
        required: true
    },
    toAccount: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);