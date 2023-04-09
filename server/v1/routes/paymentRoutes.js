const { Router } = require('express')
const router = Router()
const paymentController = require('../../controllers/PaymentController')

router.put('/mark-paid/:bookingId', paymentController.markAsPaid)
router.put('/mark-payment-as-received/:bookingId', paymentController.markPaymentAsReceived)
router.put('/mark-payment-as-not-received/:bookingId', paymentController.markPaymentAsNotReceived)

module.exports = router