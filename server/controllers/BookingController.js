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

function referenceNo(n)
{
    let ref = [];
    const prefix = "BBKC-"
    let num = '01234567890987654321';
    for (let i = 1; i <= n; i++) {
        let index = Math.floor(Math.random(0) * n)
        ref.push(num[index])
    }
    return prefix + ref.join('')
}

module.exports.create = async(req, res) => {
    const { userId, categoryId, location, state, town, address, bookDate } = req.body
    if(!userId || !categoryId || !location || !bookDate){
        return res.status(400).send(response.failure("Please check required fields"))
    }

    if(location == "personal"){
        if(!state || !town || !address){
            return res.status(400).send(response.failure("Personal location details are missing"))
        }
    }

    const user = await User.findById(userId)
    if(user){
        try {
            const booking = await Booking.create({
                user_id: userId,
                ref_no: referenceNo(7),
                category_id: categoryId,
                location,
                state: state ?? '',
                town: town ?? '',
                address: address ?? '',
                book_date: bookDate,
                book_status: status.PendingBooking
            })
            return res.status(201).send(response.success('booking created successfully', booking))
    
        } catch (error) {
            console.log(error)
        }
    }else{
        return res.status(400).send(response.failure("User does not exist"))
    }

}

module.exports.edit = async(req, res) => {
    const { bookingId } = req.params
    if(!mongoose.Types.ObjectId.isValid(bookingId)){
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findById(bookingId).populate('category_id', 'category price description')
        return res.status(201).send(response.success('booking resource', booking))
    } catch (error) {
        console.log(error)
    }
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
    const { userId } = req.params
    try {
        const myBookings = await Booking.find({user_id: userId}).populate('category_id', 'category price').exec()
        return res.status(200).send(response.success('my bookings', myBookings))
    } catch (error) {
        console.log(error)
    }
}

module.exports.allAcceptedAndConfirmedBooking = async(req, res) => {
    res.send("Get all accepted and confirmed bookings")
}

module.exports.acceptBooking = async(req, res) => {

}

module.exports.declineBooking = async(req, res) => {

}