const User = require('../models/User')
const ResponseHelper = require('../helpers/ResponseHelper')
const response = new ResponseHelper()

module.exports.users = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).send(response.success('users list', users))
    } catch (error) {
        console.log(error)
    }
}