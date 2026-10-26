const { Basket, Product, BasketProduct } = require("../models/models")

class basketController{
    async index(req,res){
        const {user} = req
        const basket = await Basket.findOne({
            where: {userId: user.id},
            include: [Product]
        })
        return res.status(200).json({success:true, data:basket})
    }

    async add(req,res){
        const {user} = req
        const {productId} = req.body
        
        const [basket] = await Basket.findOrCreate({
            where: {userId: user.id}
        })

        const [item, created] = await BasketProduct.findOrCreate({
            where:{ basketId : basket.id, productId}
        })

        if(!created){
            await item.increment('quantity')
        }

        return res.status(200).json({success:true, message: 'вы добавили в корзину'})
    }

    async decreare(req,res){
        const {user} = req
        const {productId} = req.body

        const basket = await Basket.findOne({
            where: {userId: user.id}
        })

        const item = await BasketProduct.findOne({
            where: {basketId: basket.id, productId}
        })

        if(item.quantity > 1){
            await item.decrement('quantity')
        }else{
            await item.destroy()
        }

        return res.status(200).json({success:true})
    }
}

module.exports = new basketController()