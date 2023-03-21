const {Router} = require('express')
const authController = require('../../controllers/AuthController')
const router = Router()

router.post('/sign-up', authController.signUp)
router.post('/login', authController.login)

module.exports = router