const mongoose = require('mongoose')
const Booking = require('../models/Booking')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()

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