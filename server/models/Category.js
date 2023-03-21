const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category:{

    },
    description:{

    },
    price:{

    }
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category