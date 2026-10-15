const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

class authMiddleware{
    async verifyToken(req,res,next){
        const token = req.cookies.ApiToken
        if(!token){
            return res.status(401).json({success: false, error: 'ошибка токена'})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.id)
        if(!user){
            return res.status(404).json({success: false, error: 'пользователя не существует'})
        }
        req.user = user
        next()
    }
    authAdmin(req,res,next){
        if(req.user.role !== 'admin'){
            return res.status(403).json({success: false, error: 'вы не администратор'})
        }
        next()
    }
}

module.exports = new authMiddleware()