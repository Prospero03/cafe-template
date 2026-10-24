const Router = require('express')
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middlewares/authMiddleware')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController')
const productController = require('../controllers/productController')
const router = Router()

router.get('/dashboard', authMiddleware.verifyToken, authMiddleware.authAdmin, adminController.dashboard)
router.post('/logout', authMiddleware.verifyToken, authMiddleware.authAdmin, userController.logout)    

router.get('/users', authMiddleware.verifyToken, authMiddleware.authAdmin, userController.index)
router.get('/users/:id', authMiddleware.verifyToken, authMiddleware.authAdmin, userController.show)
router.patch('/users/:id/update', authMiddleware.verifyToken, authMiddleware.authAdmin, userController.update)
router.delete('/users/:id/delete', authMiddleware.verifyToken, authMiddleware.authAdmin, userController.delete)

router.post('/category/create', authMiddleware.verifyToken, authMiddleware.authAdmin, categoryController.create)
router.get('/category', authMiddleware.verifyToken, authMiddleware.authAdmin, categoryController.index)
router.get('/category/:id', authMiddleware.verifyToken, authMiddleware.authAdmin, categoryController.show)
router.patch('/category/:id/update', authMiddleware.verifyToken, authMiddleware.authAdmin, categoryController.update)
router.delete('/category/:id/delete', authMiddleware.verifyToken, authMiddleware.verifyToken, categoryController.delete)

router.post('/products/create', authMiddleware.verifyToken, authMiddleware.authAdmin, productController.create);
router.get('/products', authMiddleware.verifyToken, authMiddleware.authAdmin, productController.index)
router.get('/products/:id', authMiddleware.verifyToken, authMiddleware.authAdmin, productController.show)
router.patch('/products/:id/update',  authMiddleware.verifyToken, authMiddleware.authAdmin, productController.update)
router.delete('/products/:id/delete', authMiddleware.verifyToken, authMiddleware.authAdmin, productController.delete)

module.exports = router