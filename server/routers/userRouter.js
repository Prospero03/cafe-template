const Router = require('express')
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = Router()

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/cookie', userController.cookie);
router.get('/profile', verifyToken, userController.profile);
router.get('/all', userController.index);
router.get('/all/:id', userController.show);
router.patch('/all/:id/update', userController.update);
router.delete('/all/:id/destroy', userController.destroy);

module.exports = router