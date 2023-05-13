const path = require('node:path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const livereload = require('livereload')
const connectLiveReload = require('connect-livereload')
const indexRouter = require('./routes/route-index.js')
const nutritionRouter = require('./routes/route-nutrition.js')
const recipeRouter = require('./routes/route-recipe.js')
const userRouter = require('./routes/route-user.js')

const liveReloadServer = livereload.createServer()
liveReloadServer.server.once('connection', () => {
	setTimeout(() => {
		liveReloadServer.refresh('/')
	}, 100)
})

const app = express()

// Middleware Connections
app.use(bodyParser.json({strict: false}))
app.use(connectLiveReload())
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({extended: false}))
app.use(logger('dev'))

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
app.use('/', indexRouter)
app.use('/nutrition', nutritionRouter)
app.use('/recipe', recipeRouter)
app.use('/user', userRouter)

module.exports = app
