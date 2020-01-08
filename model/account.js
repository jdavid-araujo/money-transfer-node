const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Account', accountSchema);