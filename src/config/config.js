const process = require('node:process')

require('dotenv').config()

module.exports = {
	MONGO_DB_URL: process.env.MONGO_DB_URL,
	USER_EMAIL: process.env.USER_EMAIL,
	USER_PASSWORD: process.env.USER_PASSWORD,
}
