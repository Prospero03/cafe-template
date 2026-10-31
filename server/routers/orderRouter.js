const Router = require('express')
const { verifyToken } = require('../middlewares/authMiddleware')
const orderController = require('../controllers/orderController')
const router = Router()


router.post('/store', verifyToken, orderController.store)

module.exports = router