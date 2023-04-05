const mongoose = require('mongoose')
const Booking = require('../models/Booking')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()
const Category = require('../models/Category')

module.exports.categories = async(req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: 'desc' })
        return res.status(200).send(response.success('category list', categories))
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports.create = async(req, res) => {
    const { name, description, price } = req.body
    if(!name || !description || !price){
        return res.status(400).send(response.failure('Please check required field'))
    }
    //validate for wrong price format
    try {
        const storeCategory = await Category.create({category:name, description, price})
        return res.status(201).send(response.success('category created successfully', storeCategory))
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports.category = async(req, res) => {
    const { categoryId } = req.params
    if(!mongoose.Types.ObjectId.isValid(categoryId)){
        return res.status(400).send(response.failure('resource not found'))
    }
    try {
        const category = await Category.findById(categoryId)
        return res.status(201).send(response.success('category', category))
    } catch (error) {
        console.log(error)
    }
}

module.exports.update = async(req, res) => {
    const { categoryId } = req.params
    const { name, description, price } = req.body
    if(!mongoose.Types.ObjectId.isValid(categoryId)){
        return res.status(400).send(response.failure('resource not found'))
    }
    if(!name || !description || !price){
        return res.status(400).send(response.failure('Please check required field'))
    }
    try {
        const category = { category:name, description, price }
        await Category.findByIdAndUpdate(categoryId, category, {new: true})
        return res.status(201).send(response.success('category updated successfully', category))
    } catch (error) {
        console.log(error)
    }
}

module.exports.destroy = async(req, res) => {
    const { categoryId } = req.params
    if(!mongoose.Types.ObjectId.isValid(categoryId)){
        return res.status(400).send(response.failure('resource not found'))
    }
    const categoryExistInBooking = await Booking.findOne({category_id: categoryId}).exec()
    if(categoryExistInBooking){
        return res.status(400).send(response.failure('resource already in use'))
    }

    try {
        await Category.findByIdAndRemove(categoryId)
        return res.status(201).send(response.success('category removed successfully'))
    } catch (error) {
        console.log(error)
    }
}