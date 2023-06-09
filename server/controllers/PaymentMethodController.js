const mongoose = require('mongoose')
const PaymentMethod = require('../models/PaymentMethod')
const Booking = require('../models/Booking')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()

module.exports.index = async(req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find().sort({ createdAt: 'desc' })
        return res.status(200).send(response.success('payment methods', paymentMethods))
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports.create = async(req, res) => {
    const { bank, acc_number, acc_name } = req.body
    if(!bank || !acc_number || !acc_name){
        return res.status(400).send(response.failure('Please check required fields'))
    }
    if(acc_number.length !== 10){
        return res.status(400).send(response.failure('Account number must be NUBAN format'))
    }

    try {
        const paymentMethod = await PaymentMethod.create({bank, acc_number, acc_name})
        return res.status(201).send(response.success('payment method created successfully', paymentMethod))
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports.paymentMethod = async(req, res) => {
    const { paymentMethodId } = req.params
    if(!mongoose.Types.ObjectId.isValid(paymentMethodId)){
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const paymentMethod = await PaymentMethod.findById(paymentMethodId)
        return res.status(201).send(response.success('payment method', paymentMethod))
    } catch (error) {
        console.log(error)
    }
}

module.exports.update = async(req, res) => {
    const { bank, acc_number, acc_name } = req.body
    const { paymentMethodId } = req.params
    if(!mongoose.Types.ObjectId.isValid(paymentMethodId)){
        return res.status(400).send(response.failure('resource not found'))
    }
    if(!bank || !acc_number || !acc_name){
        return res.status(400).send(response.failure('Please check required fields'))
    }
    if(acc_number.length !== 10){
        return res.status(400).send(response.failure('Account number must be NUBAN format'))
    }

    try {
        const paymentMethod = await PaymentMethod.findByIdAndUpdate(paymentMethodId, {bank, acc_number, acc_name}, {new:true})
        return res.status(201).send(response.success('payment method updated successfully', paymentMethod))
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports.toggleActivatePaymentMethod = async(req, res) => {
    const { paymentMethodId } = req.params
    const { status } = req.body
    if(!mongoose.Types.ObjectId.isValid(paymentMethodId)){
        return res.status(400).send(response.failure('resource not found'))
    }

    try {
        const checkActive = await PaymentMethod.findOne({is_active: true})
        if(checkActive && status == true){
            return res.status(400).send(response.failure('Please deactivate active account'))
        }
        const paymentMethod = await PaymentMethod.findByIdAndUpdate(paymentMethodId, {is_active: status}, {new: true})
        if(status == true){
            return res.status(201).send(response.success('successfully set payment method to active', paymentMethod))
        }else{
            return res.status(201).send(response.success('successfully set payment method to Inactive', paymentMethod))
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }

}

module.exports.destroy = async(req, res) => {
    const { paymentMethodId } = req.params
    if(!mongoose.Types.ObjectId.isValid(paymentMethodId)){
        return res.status(400).send(response.failure('resource not found'))
    }

    try {
        await PaymentMethod.findByIdAndRemove(paymentMethodId)
        return res.status(201).send(response.success('payment method removed successfully'))
    } catch (error) {
        console.log(error)
    }
}

module.exports.activePaymentMethod = async(req, res) => {
    const { bookingId } = req.params
    if(!mongoose.Types.ObjectId.isValid(bookingId)){
        return res.status(400).send(response.failure('resource not found'))
    }

    try {
        const booking = await Booking.findById(bookingId)
            .populate('category_id', 'category price')
            .populate('user_id', 'fullname email')

        const activePaymentMethod = await PaymentMethod.findOne({is_active: true})
        if(!activePaymentMethod){
            return res.status(400).send(response.failure('No active method'))
        }
        // console.log("booking", booking)
        // console.log("pay method", activePaymentMethod)
        return res.status(200).send(response.success('payment method for booking', {booking: booking, paymentMethod: activePaymentMethod}))
    } catch (error) {
        console.log(error)
    }

}