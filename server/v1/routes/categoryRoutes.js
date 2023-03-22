const { Router } = require('express')
const router = Router()
const categoryController = require('../../controllers/CategoryController')

router.get('/', categoryController.categories)
router.post('/create', categoryController.create)
router.put('/:categoryId', categoryController.update)
router.delete('/:categoryId', categoryController.destroy)

module.exports = router