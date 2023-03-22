const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()
const jwt = require('jsonwebtoken')
const maxAge = 60
const createJwt = id => {
    return jwt.sign({id}, 'user token', {expiresIn:maxAge})
}

module.exports.signUp = async(req, res) => {
    const { fullname, email, phone, address, password } = req.body
    if(!fullname || !email || !phone || !address || !password){
       return res.status(400).send(response.failure('Please check your required fields!'))
    }

    try {
        const user = await User.create({fullname, email, phone, address, password})
        const token = createJwt(user._id)
        //send token to cookie response
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        return res.status(201).send(response.success('user created', user))
    } catch (error) {
        console.log(error)
        let err = Object.keys(error.keyValue)
        // return res.status(400).send(err[0])
        if(error.code === 11000){
            return res.status(400).send(response.failure(`${err[0]} field already exists`))
        }
    }

}

module.exports.login = async(req, res) => {
    const { email, password} = req.body
    const user = await User.findOne({email})
    if(!email || !password){
        return res.status(400).send(response.failure('Please check your required fields!'))
    }
    if(user){
        try {
            const isAuthenticated = await bcrypt.compare(password, user.password)
            if(!isAuthenticated){
                return res.status(400).send(response.failure('You have provided incorrect credentials'))
            }
            const token = createJwt(user._id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
            return res.status(201).send(response.success('user logged in successfully', user))
        } catch (error) {
            console.log(error)
        }
        
    }else{
        return res.status(400).send(response.failure('You have provided incorrect credentials'))
    }

}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    return res.status(200).send(response.success('Successfully logged out'))
}