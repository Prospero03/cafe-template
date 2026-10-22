const Router = require('express')
const router = Router()
const userRouter = require('./userRouter')
const adminRouter =require('./adminRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/category', categoryRouter)

module.exports = router