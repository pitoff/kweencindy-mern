const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    ref_no:{
        type:String,
        required:true
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required:true
    },
    location:{
        type:String,
        required:true
    },
    state:{
        type:String,
    },
    town:{
        type:String,
    },
    address:{
        type:String,
    },
    payment_status:{
        type:String,
    },
    book_status:{
        type:String,
    },
    book_date:{
        type:String,
    }
}, {timestamps:true})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking