const mongoose = require('mongoose')
const Booking = require('../models/Booking')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()
const bookingStatus = require('../helpers/StatusHelper')

module.exports.markAsPaid = async(req, res) => {
    const { bookingId } = req.params
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, {payment_status: bookingStatus.AwaitingConfirmation}, {new:true})
        return res.status(200).send(response.success('Payment successfully marked as paid', booking))
    } catch (error) {
        console.log(error)
    }
}

module.exports.markAsNotPaid = async(req, res) => {
    const { bookingId } = req.params
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, {payment_status: bookingStatus.PendingPayment}, {new:true})
        return res.status(200).send(response.success('Payment marked as not paid', booking))
    } catch (error) {
        console.log(error)
    }
}

module.exports.markPaymentAsReceived = async(req, res) => {
    const { bookingId } = req.params
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, {payment_status: bookingStatus.PaymentConfirmed}, {new:true})
        return res.status(200).sennd(response.success('Payment successfully marked as received', booking))
    } catch (error) {
        console.log(error)
    }
}

module.exports.markPaymentAsNotReceived = async(req, res) => {
    const { bookingId } = req.params
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, {payment_status: bookingStatus.PaymentNotConfirmed}, {new:true})
        return res.status(200).sennd(response.success('Payment successfully marked as not received', booking))
    } catch (error) {
        console.log(error)
    }
}

module.exports.activePaymentDetails = async(req, res) => {
    
}