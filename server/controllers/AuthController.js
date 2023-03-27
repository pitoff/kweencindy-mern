const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()
const jwt = require('jsonwebtoken')
const maxAge = 24 * 60 * 60
const createJWT = id => {
    return jwt.sign({id}, 'user token', {expiresIn:maxAge})
}

module.exports.signUp = async(req, res) => {
    const { firstname, lastname, email, phone, password } = req.body
    if(!firstname || !lastname || !email || !phone || !password){
       return res.status(400).send(response.failure('Please check your required fields!'))
    }

    try {
        const user = await User.create({fullname:lastname + ' ' + firstname, email, phone, password})
        const token = createJWT(user._id)
        //send token to cookie response
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).send(response.success('Thank you for creating an account', {user: user, accessToken: token}))
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
            const token = createJWT(user._id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
            return res.status(201).send(response.success('user logged in successfully', {user: user, accessToken: token}))
        } catch (error) {
            console.log(error)
        }
        
    }else{
        return res.status(400).send(response.failure('You have provided incorrect credentials'))
    }

}

module.exports.verifyAuth = async(req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'user token', async(err, decodedToken) => {
            // console.log("token decoded is", decodedToken)
            if(err){
                console.log("my error", err.message)
                return res.status(401).send(response.failure('Token mismatch'))
            }else{
                let user = await User.findById(decodedToken.id)
                return res.status(200).send(response.success('current user', user))
            }
        })
    }else{
        // next()
        return res.status(401).send(response.failure('User Unauthorized'))
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    return res.status(200).send(response.success('Successfully logged out'))
}