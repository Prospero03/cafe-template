const { Order, Basket, BasketProduct, User, Product } = require("../models/models")

class orderController{
    async store(req,res){
        const {user} = req
        
        const basket = await Basket.findOne({
            where: {userId: user.id}
        }) 
        const items = await BasketProduct.findAll({
            where: {basketId: basket.id}
        })

        if(!basket){
            return res.status(400).json({success:false, error:'корзина пустая'})
        }
        if(!items.length){
            return res.status(400).json({success:false, error:'корзина пустая'})
        }

        const order = await Order.create({
            userId:user.id
        })

        for(const item of items){
            await order.addProduct(item.productId,{ through: {quantity: item.quantity}})
        }

        return res.status(201).json({success:true, message:'Зака создан', data:order})
    }

    async index(req,res){
        const orders = await Order.findAll({
            include: [User, Product],
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json({success:true, data:orders})
    }

    async show(req,res){
        const {id} = req.params
        const order = await Order.findByPk(id, {
            include:[User, Product]
        })
        return res.status(200).json({success:true, data:order})
    }

    async update(req,res){
        const {id} = req.params
        const {status} = req.body
        const order = await Order.findByPk(id)

        order.status = status
        await order.save()

        return res.status(200).json({success:true, message:'Вы изменили статус'})
    }
}

module.exports = new orderController()