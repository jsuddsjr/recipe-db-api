const path = require('node:path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const indexRouter = require('./routes/index.js')
const recipeRouter = require('./routes/recipe.js')
const userRouter = require('./routes/user.js')

const app = express()

// Middleware Connections
app.use(express.json({strict: false}))
app.use(express.urlencoded({extended: false}))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
app.use('/', indexRouter)
app.use('/recipe', recipeRouter)
app.use('/user', userRouter)

module.exports = app
