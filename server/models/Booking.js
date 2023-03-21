const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    user_id:{

    },
    ref_no:{

    },
    category_id:{

    },
    location:{

    },
    state:{

    },
    town:{

    },
    address:{

    },
    payment_status:{

    },
    book_status:{

    },
    book_date:{

    }
})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking