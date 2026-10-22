const { DataTypes } = require('sequelize')
const database = require('../database/database')

const User = database.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    given_name: {type: DataTypes.STRING, allowNull: true},
    family_name: {type: DataTypes.STRING},
    additional_name: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    street: {type: DataTypes.STRING},
    entrance: {type: DataTypes.STRING},
    house: {type: DataTypes.STRING},
    apartment: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING,  defaultValue: null},
    gender: {type: DataTypes.ENUM('man', 'woman'), allowNull: true, defaultValue: null},
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
    description: {type: DataTypes.TEXT},
    image : {type: DataTypes.STRING}
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