const Router = require('express')
const router = Router()
const userRouter = require('./userRouter')
const adminRouter =require('./adminRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')
const productRouter = require('./productRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)
router.use('/products', productRouter)

module.exports = router