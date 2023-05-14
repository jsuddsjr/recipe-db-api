const path = require('node:path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const connectLiveReload = require('connect-livereload')
const apiRouter = require('./routes/route-api.js')
const indexRouter = require('./routes/route-index.js')

const app = express()

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middleware Connections
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json({strict: false}))
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

if (app.get('env') === 'development') {
	app.use(connectLiveReload())
	app.use(logger('dev'))
}

// Routes
app.use('/', indexRouter)
app.use('/api', apiRouter)

module.exports = app
