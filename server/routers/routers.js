const Router = require('express')
const router = Router()
const userRouter = require('./userRouter')
const adminRouter =require('./adminRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

module.exports = router