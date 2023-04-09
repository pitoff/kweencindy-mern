const { Router } = require('express')
const router = Router()
const paymentMethodController = require('../../controllers/PaymentMethodController')

router.get('/', paymentMethodController.index)
router.post('/create', paymentMethodController.create)
router.get('/:paymentMethodId', paymentMethodController.paymentMethod)
router.get('/active/:bookingId', paymentMethodController.activePaymentMethod)
router.put('/:paymentMethodId', paymentMethodController.update)
router.put('/toggle-activate/:paymentMethodId', paymentMethodController.toggleActivatePaymentMethod)
router.delete('/:paymentMethodId', paymentMethodController.destroy)

module.exports = router