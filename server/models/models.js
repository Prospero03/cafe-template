const { DataTypes } = require('sequelize')
const database = require('../database/database')

const User = database.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING, defaultValue: null},
    role: {type: DataTypes.ENUM('admin', 'user'), defaultValue:'user'},
})

const Product = database.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT}
})

const Category = database.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT}
})

const CategoryProduct = database.define('categories_products',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})

Category.belongsToMany(Product, {through : CategoryProduct})
Product.belongsToMany(Category, {through : CategoryProduct})


module.exports = {
    User, 
    Product,
    Category,
    CategoryProduct
}