const { DataTypes } = require('sequelize')
const database = require('../database/database')

const User = database.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.ENUM('admin', 'user'), defaultValue:'user'},
})

module.exports = {
    User
}