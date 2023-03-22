const { Router } = require('express')
const authController = require('../../controllers/AuthController')
const router = Router()

/**
 * @openapi
 * /api/v1/sign-up:
 *   post:
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   items: 
 *                     type: object
 */
router.post('/sign-up', authController.signUp)
router.post('/login', authController.login)

module.exports = router