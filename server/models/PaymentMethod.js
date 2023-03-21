const mongoose = require('mongoose')

const PaymentMethodSchema = new mongoose.Schema({
    bank:{

    },
    acc_number:{

    },
    acc_name:{

    },
    is_active:{

    }
})

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema)
module.exports = PaymentMethod