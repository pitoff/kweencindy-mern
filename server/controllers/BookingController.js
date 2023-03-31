const mongoose = require('mongoose')
const Booking = require('../models/Booking')
const User = require('../models/User')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()
const status = {
    PendingBooking: 'pending booking',
    BookingAccepted: 'booking accepted',
    BookingDeclined: 'booking declined',
    PendingPayment: 'pending payment',
    AwaitingConfirmation: 'awaiting confirmation',
    PaymentConfirmed: 'payment confirmed',
    PaymentNotConfirmed: 'payment not confirmed',
}

module.exports.create = async(req, res) => {
    const { userId, categoryId, location, state, town, address, bookDate } = req.params
    if(!userId || !categoryId || !location || !bookDate){
        return res.status(400).send(response.failure("Please check required fields"))
    }

    if(location == "personal"){
        if(!state || !town || !address){
            return res.status(400).send(response.failure("Please check required fields"))
        }
    }

    const user = await User.findById(userId)
    if(user){
        try {
            const booking = await Booking.create({
                user_id: userId,
                category_id: categoryId,
                location,
                state: state ?? '',
                town: town ?? '',
                address: address ?? '',
                book_date: bookDate
            })
    
        } catch (error) {
            
        }
    }else{
        return res.status(400).send(response.failure("Please user does not exist"))
    }

}

module.exports.edit = async(req, res) => {

}

module.exports.update = async(req, res) => {

}

module.exports.destroy = async(req, res) => {

}

module.exports.viewBooking = async(req, res) => {

}

module.exports.allBooking = async(req, res) => {
    try {
        const bookings = await Booking.find()
        return res.status(200).send(response.success('list of bookings', bookings))
        
    } catch (error) {
        
    }
}

module.exports.myBooking = async(req, res) => {
    const { id } = req.params
    try {
        const myBookings = await Booking.find({user_id: id})
        return res.status(200).send(response.success('my bookings', myBookings))
    } catch (error) {
        
    }
}

module.exports.allAcceptedAndConfirmedBooking = async(req, res) => {
    res.send("Get all accepted and confirmed bookings")
}

module.exports.acceptBooking = async(req, res) => {

}

module.exports.declineBooking = async(req, res) => {

}