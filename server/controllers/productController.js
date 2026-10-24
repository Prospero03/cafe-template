const uuid = require('uuid')
const path = require('path')
const { Product, Category, CategoryProduct } = require('../models/models')

class productController{
    async create(req,res){
        const {name, description, price, categoryId} = req.body
        const {image} =req.files

        let fileImage = uuid.v4() + '.webp'
        image.mv(path.resolve(__dirname, '..', 'static', fileImage))

        // const categoryProduct = await CategoryProduct.findAll({
        //     where: {categoryId}
        // })

        // const category = await Category.findAll({
        //     where: {id: categoryProduct.categoryId}
        // })

        const product = await Product.create({
            name: name,
            description: description,
            price: price,
            image: fileImage,
            // category: category.name   
        })

        await product.save()
        return res.status(200).json({success:true, message: 'вы создали товар'})
    }
    async index(req,res){
        const products = await Product.findAll({
            attributes: ['id', 'name', 'description', 'price', 'image'],
            order: [['createdAt', 'DESC']]
            // include: [Category]
        })
        return res.status(200).json({success:true, data: products})
    }
    async show(req,res){
        const {id} = req.params
        const product = await Product.findByPk(id)
        return res.status(200).json({success:true, data:product})
    }
    async update(req,res){
        const {id} = req.params
        const {name, description, price} = req.body
        const {image} = req.files || {}

        const product = await Product.findByPk(id)
        product.name = name
        product.description =description
        product.price =price
        if(image){
            let fileImage = uuid.v4() + path.extname(image.name)
            await image.mv(path.resolve(__dirname, '..', 'static', fileImage))
            product.image = fileImage
        }

        await product.save()
        return res.status(200).json({success:true, message:'вы обновили товар'})
    }
    async delete(req,res){
        const {id} = req.params
        const product = await Product.findByPk(id)
        await product.destroy()
         return res.status(200).json({success:true, message:'вы успешно удалили товар'})
    }

}

module.exports = new productController()