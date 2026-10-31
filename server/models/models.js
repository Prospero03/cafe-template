const { DataTypes, INTEGER } = require('sequelize')
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
    price: {type: DataTypes.STRING, defaultValue: '0'},
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

const Basket = database.define('baskets', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true}
})

const BasketProduct = database.define('basket_products', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    quantity:{type: DataTypes.INTEGER, defaultValue: 1}
})

const Order = database.define('orders', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    status:{type: DataTypes.ENUM('создан', 'отправлен', 'готовится', 'отменён'), defaultValue:'создан'}
})

const OrderUser = database.define('orders_users',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

const OrderProduct = database.define('orders_products',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    quantity:{type: DataTypes.INTEGER, defaultValue: 1}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Order)
Order.belongsTo(User)

Basket.belongsToMany(Product, {through: BasketProduct})
Product.belongsToMany(Basket, {through: BasketProduct})

Category.belongsToMany(Product, {through: CategoryProduct})
Product.belongsToMany(Category, {through: CategoryProduct})

Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})


module.exports = {
    User, 
    Product,
    Category,
    CategoryProduct,
    Basket,
    BasketProduct,
    Order,
    OrderProduct,
}