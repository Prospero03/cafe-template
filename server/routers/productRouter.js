const Router = require('express')
const productController = require('../controllers/productController')
const router =Router()

router.get('/',  productController.index)
router.get('/:id',  productController.show)

module.exports = router