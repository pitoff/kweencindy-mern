const mongoose = require('mongoose')
const User = require('../models/User')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()

module.exports.signUp = async(req, res) => {
    const { fullname, email, phone, address, password } = req.body
    try {
        const user = await User.create({fullname, email, phone, address, password})
        console.log(user)
        res.status(201).send(response.success('user created', user))
    } catch (error) {
        console.log(error)
        res.status(400).send(response.failure('Err occured'))
    }
}

module.exports.login = async() => {

}