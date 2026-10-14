require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const fileUpload = require('express-fileupload')
const apiRouter = require('./routers/routers')
const sequelize = require('./database/database')
const models = require('./models/models')

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', apiRouter)

const start = async()=>{
    await sequelize.authenticate()
    await sequelize.sync({alter:true})
    app.listen(PORT, ()=> console.log(`Сервер запущен на порту ${PORT}`))
}

start()
