const mongoose = require('mongoose')

const PaymentMethodSchema = new mongoose.Schema({
    bank:{
        type:String,
        required: true
    },
    acc_number:{
        type:String,
        required: true
    },
    acc_name:{
        type: String,
        required: true
    },
    is_active:{
        type: Boolean,
        default: 0
    }
})

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema)
module.exports = PaymentMethod