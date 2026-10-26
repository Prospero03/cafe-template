const path = require('path')
const uuid =require('uuid')
const { Category } = require('../models/models')
const { json } = require('sequelize')

class categoryController{
    async create(req,res){
        const {name, description} = req.body
        const {image} = req.files

        let fileImage = uuid.v4() + '.jpg'
        image.mv(path.resolve(__dirname, '..', 'static', fileImage))

        const category = await Category.create({
            name: name,
            description: description,
            image: fileImage
        })

        await category.save()
        return res.status(200).json({success:true, message:'вы создали категорию'})
    }
    async index(req,res){
        const category = await Category.findAll({
            attributes: ['id', 'name', 'description', 'image'],
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json({success:true, data: category})
    }
    async show(req,res){
        const {id} = req.params
        const category = await Category.findByPk(id)
        return res.status(200).json({success:true, data: category})
    }
    async update(req,res){
        const {id} = req.params
        const {name, description} = req.body
        const {image} = req.files || {}

        const category = await Category.findByPk(id)

        category.name = name
        category.description = description
        if(image){
            let fileImage = uuid.v4() + path.extname(image.name)
            image.mv(path.resolve(__dirname, '..', 'static', fileImage))
            category.image = fileImage
        }

        await category.save()
        return res.status(200).json({success:true, message: 'вы обновили категорию'})
    }

    async delete(req,res){
        const {id} = req.params
        const category = await Category.findByPk(id)
        await category.destroy()
         return res.status(200).json({success:true, message: 'вы удалили категорию'})
    }
}

module.exports = new categoryController()