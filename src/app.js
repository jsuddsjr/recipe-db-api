const path = require('node:path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const passport = require('./middlewares/passport-strategies')
const swaggerUi = require('swagger-ui-express')
const swaggerSchema = require('./swagger.json')

const app = express()

// Passport Config
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
//! See passport-strategies.js for more config

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middleware Connections
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json({strict: false}))
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSchema, {
		customSiteTitle: 'Recipe DB API',
		explorer: true,
	}),
)

if (app.get('env') === 'development') {
	app.use(require('connect-livereload')())
	app.use(require('morgan')('dev'))
}

// Routes
app.use('/', require('./routes'))

module.exports = app
