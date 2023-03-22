const mongoose = require('mongoose')
const Booking = require('../models/Booking')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()
const Category = require('../models/Category')

module.exports.categories = async(req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).send(response.success('category list', categories))
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports.create = async(req, res) => {
    const { category, description, price } = req.body

    try {
        const storeCategory = await Category.create({category, description, price})
        return res.status(201).send(response.success('category created successfully', storeCategory))
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

module.exports.update = async(req, res) => {

}

module.exports.destroy = async(req, res) => {

}