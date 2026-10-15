const {Op} = require('sequelize')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class userController{
    async register(req,res){
        const {login, email, password} = req.body
        if(!login || !email || !password){
            return res.status(400).json({success:false, error:'вы ввели не все данные'})
        }

        const formatLogin = /^[A-Za-z\d]+$/
        const letters = password.match(/[A-Za-z]/g) || []

        if(!formatLogin.test(login)){
             return res.status(400).json({success:false, error:'только латинские буквы и цифры'})
        }
        if(letters < 1){
            return res.status(400).json({success:false, error:'в пароле не меньше 1 буквы'})
        }
        if(login.length < 4){
            return res.status(400).json({success:false, error:'логин меньше 4 символов'})
        }
        if(password.length < 4){
            return res.status(400).json({success:false, error:'пароль меньше 4 символов'})
        }
        const existingUser = await User.findOne({
            where: { [Op.or]:[{email, login}]}
        })
        if(existingUser){
            return res.status(400).json({success:false, error:'такой пользователь уже существует'})
        }

        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new User({login, email, password:hashPassword})
        await newUser.save()

        return res.status(200).json({success:true, message:'вы зарегистрировались', role: newUser.role})
    }
    async login(req,res){
        const {login, password} = req.body
        if(!login || !password){
            return res.status(400).json({success:false, error:'вы ввели не все данные'})
        }

        const existingUser = await User.findOne({
            where: {login}
        })
        if(!existingUser){
            return res.status(400).json({success:false, error:'неверный логин'})
        }
        
        const comparePassword = await bcrypt.compare(password, existingUser.password)
        if(!comparePassword){
            return res.status(400).json({success:false, error:'неверный пароль'})
        }

        const token = jwt.sign(
            {id: existingUser.id, login: existingUser.login},
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.cookie('ApiToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({success:true, message:'вы вошли', role: existingUser.role})

    }
    async logout(req,res){
        res.clearCookie('ApiToken',{
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        })
        return res.status(200).json({success:true, message:'вы вышли'})
    }
    async cookie(req,res){
        const token = req.cookies.ApiToken
        if(!token){
            return res.status(200).json({success: true, message: false})
        }
        return res.status(200).json({success: true, message: true})
    }
    async profile(req,res){
        const {user} = req
         return res.status(200).json({
            success:true, 
            data:{
                name: user.name,
                login: user.login
            }
        })
    }
    async index(req,res){

    }
    async show(req,res){

    }
    async update(req,res){

    }
    async destroy(req,res){

    }
}

module.exports = new userController()
