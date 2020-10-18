const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    username:{
        type: String,
        required: true,
        max: 255,
        min:6
    },
    accountNumber: {
        type: Number,
        required: true,
        min: 6
    },
    csvData: [
        {
            Date : Date,
            Withdraw: Number,
            Deposit: Number,
            'Closing Balance': Number
        }
    ]
})

module.exports = mongoose.model('Transaction', transactionSchema);