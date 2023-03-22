const { Router } = require('express')
const userController = require('../../controllers/UserController')
const router = Router()

router.get('/', userController.users)

module.exports = router