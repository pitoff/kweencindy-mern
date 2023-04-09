const mongoose = require('mongoose')
const Booking = require('../models/Booking')
const User = require('../models/User')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()
const bookingStatus = require('../helpers/StatusHelper')

function referenceNo(n) {
    let ref = [];
    const prefix = "BBKC-"
    let num = '01234567890987654321';
    for (let i = 1; i <= n; i++) {
        let index = Math.floor(Math.random(0) * n)
        ref.push(num[index])
    }
    return prefix + ref.join('')
}

module.exports.create = async (req, res) => {
    const { userId, categoryId, location, state, town, address, bookDate } = req.body
    if (!userId || !categoryId || !location || !bookDate) {
        return res.status(400).send(response.failure("Please check required fields"))
    }

    if (location == "personal") {
        if (!state || !town || !address) {
            return res.status(400).send(response.failure("Personal location details are missing"))
        }
    }

    const user = await User.findById(userId)
    if (user) {
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
                payment_status: bookingStatus.PendingPayment,
                book_status: bookingStatus.PendingBooking,
            })
            return res.status(201).send(response.success('booking created successfully', booking))

        } catch (error) {
            console.log(error)
        }
    } else {
        return res.status(400).send(response.failure("User does not exist"))
    }

}

module.exports.edit = async (req, res) => {
    const { bookingId } = req.params
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findById(bookingId).populate('category_id', 'category price description')
        return res.status(201).send(response.success('booking resource', booking))
    } catch (error) {
        console.log(error)
    }
}

module.exports.update = async (req, res) => {
    const { categoryId, location, state, town, address, bookDate } = req.body
    const { bookingId } = req.params
    if (!categoryId || !location || !bookDate) {
        return res.status(400).send(response.failure("Please check required fields"))
    }

    if (location == "personal") {
        if (!state || !town || !address) {
            return res.status(400).send(response.failure("Personal location details are missing"))
        }
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, {
            category_id: categoryId,
            location,
            state: state ?? '',
            town: town ?? '',
            address: address ?? '',
            book_date: bookDate,
        }, {new:true})
        return res.status(201).send(response.success('booking updated successfully', booking))

    } catch (error) {
        console.log(error)
    }
}

module.exports.destroy = async (req, res) => {
    const {bookingId} = req.params
    if(!mongoose.Types.ObjectId.isValid(bookingId)){
        return res.status(400).send(response.failure('resource not found'))
    }

    try {
        const deleteBooking = await Booking.findByIdAndDelete(bookingId)
        return res.status(200).send(response.success('booking deleted successfully', deleteBooking))
    } catch (error) {
        console.log(error)
    }
}

module.exports.viewBooking = async (req, res) => {

}

module.exports.allBooking = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('category_id', 'category price').populate('user_id', 'fullname email')
        return res.status(200).send(response.success('list of bookings', bookings))

    } catch (error) {

    }
}

module.exports.myBooking = async (req, res) => {
    const { userId } = req.params
    try {
        const myBookings = await Booking.find({ user_id: userId }).populate('category_id', 'category price').exec()
        return res.status(200).send(response.success('my bookings', myBookings))
    } catch (error) {
        console.log(error)
    }
}

module.exports.allAcceptedAndConfirmedBooking = async (req, res) => {
    res.send("Get all accepted and confirmed bookings")
}

module.exports.acceptBooking = async (req, res) => {
    const { bookingId } = req.params
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, {book_status: bookingStatus.BookingAccepted}, {new:true})
        return res.status(200).send(response.success('Booking accepted', booking))
    } catch (error) {
        console.log(error)
    }
}

module.exports.declineBooking = async (req, res) => {
    const { bookingId } = req.params
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, {book_status: bookingStatus.BookingDeclined}, {new:true})
        return res.status(200).send(response.success('Booking declined', booking))
    } catch (error) {
        console.log(error)
    }
}