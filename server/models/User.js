const mongoose = require('mongoose')
const roles = {
    ADMIN: "admin",
    DEFAULT: "default"
}

const UserSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true,
        default: roles.DEFAULT
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps:true})

const User = mongoose.model('User', UserSchema)
module.exports = User