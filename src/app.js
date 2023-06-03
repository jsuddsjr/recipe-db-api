const path = require("node:path")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const session = require("express-session")
const passport = require("./middlewares/passport-strategies")
const swaggerUi = require("swagger-ui-express")
const swaggerSchema = require("./swagger.json")
const { randomUUID } = require("node:crypto")

const app = express()

// Passport Config
app.use(session({
	secret: randomUUID(),
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true },
}))

app.use(passport.initialize())
app.use(passport.session())
//! See passport-strategies.js for more config

// Views
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Middleware Connections
app.use(cors())
app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.json({ type: "application/json", strict: false }))
app.use(bodyParser.urlencoded({ type: "application/x-www-form-urlencoded", extended: true }))
app.use(cookieParser())

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSchema, {explorer: true}),
)

if (app.get("env") === "development") {
	app.use(require("connect-livereload")())
	app.use(require("morgan")("dev"))
}

// Routes
app.use("/", require("./routes"))

module.exports = app
