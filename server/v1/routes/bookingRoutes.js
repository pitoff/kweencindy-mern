const {Router} = require('express')
const router = Router();
const bookingController = require('../../controllers/BookingController')

/**
 * @openapi
 * /api/v1/all:
 *   post:
 *     tags:
 *       - Booking
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
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/all', bookingController.allBooking)

/**
 * @openapi
 * /api/v1/my-booking:
 *   post:
 *     tags:
 *       - Booking
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
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/my-booking/:userId', bookingController.myBooking)

/**
 * @openapi
 * /api/v1/confirmed-booking:
 *   post:
 *     tags:
 *       - Booking
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
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/confirmed-booking', bookingController.allAcceptedAndConfirmedBooking)

router.post('/', bookingController.create)

router.get('/:bookingId', bookingController.edit)

router.put('/:bookingId', bookingController.update)

router.put('/accept/:bookingId', bookingController.acceptBooking)

router.put('/decline/:bookingId', bookingController.declineBooking)

router.delete('/:bookingId', bookingController.destroy)

module.exports = router;