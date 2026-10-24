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
                id: user.id,
                given_name: user.given_name,
                family_name: user.family_name,
                additional_name: user.additional_name,
                gender: user.gender,
                city: user.city,
                street: user.street,
                entrance: user.entrance,
                house: user.house,
                apartment: user.apartment, 
                email: user.email,
                login: user.login,
            }
        })
    }
    async index(req,res){
        const users = await User.findAll({
            attribute: ['login', 'role', 'id'],
            order: [['createdAt', 'DESC']]
            
        })
        return res.status(200).json({success:true, message: true, data: users})
    }
    async show(req,res){
        const {id} = req.params
        const user = await User.findByPk(id)
        return res.status(200).json({success:true, data: user})
    }
    async update(req,res){
        const {id} = req.params
        const {
            given_name, 
            family_name, 
            additional_name, 
            gender, 
            city, 
            street, 
            entrance, 
            house, 
            apartment,
            login,
        } = req.body

        const user = await User.findByPk(id)
        
        user.login = login
        user.given_name = given_name
        user.family_name = family_name
        user.additional_name = additional_name
        user.gender = gender
        user.city = city
        user.street = street
        user.entrance = entrance
        user.house = house
        user.apartment = apartment

        await user.save()
        return res.status(200).json({success:true, message:'вы обновили данные'})
    }
    async delete(req,res){
        const {id} = req.params
        const user = await User.findByPk(id)
        await user.destroy()
        return res.status(200).json({success:true, message:'вы успешно удалили пользователя'})
    }
}

module.exports = new userController()
