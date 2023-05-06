require('dotenv').config()
const path = require('node:path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const indexRouter = require('./routes/index.js')

const app = express()

// Middleware Connections
app.use(express.json({strict: false}))
app.use(express.urlencoded({extended: false}))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// Routes
app.use('/', indexRouter)

module.exports = app
