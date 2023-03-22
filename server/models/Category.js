const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    }
}, {timestamps:true})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category