const Router = require('express')
const { verifyToken } = require('../middlewares/authMiddleware')
const basketController = require('../controllers/basketController')
const router = Router()

router.get('/index', verifyToken, basketController.index)
router.post('/add', verifyToken, basketController.add)
router.post('/decreare', verifyToken , basketController.decreare)

module.exports = router