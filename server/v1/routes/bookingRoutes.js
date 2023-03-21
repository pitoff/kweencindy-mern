const {Router} = require('express')
const router = Router();
const bookingController = require('../../controllers/BookingController')

router.get('/all', bookingController.allBooking)

router.get('/my-booking', bookingController.myBooking)

router.get('/confirmed-booking', bookingController.allAcceptedAndConfirmedBooking)

module.exports = router;