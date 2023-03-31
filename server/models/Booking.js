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
        // required:true
    },
    town:{
        type:String,
        // required:true
    },
    address:{
        type:String,
        // required:true
    },
    payment_status:{
        type:String,
        required:true
    },
    book_status:{
        type:String,
        required:true
    },
    book_date:{
        type:String,
        required:true
    }
}, {timestamps:true})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking