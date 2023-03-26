const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        unique: true,
        required: true,
    },
    phone:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps:true})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User