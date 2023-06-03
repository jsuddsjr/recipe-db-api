const process = require('node:process')

require('dotenv').config({debug: true})

module.exports = {
	MONGO_DB_URL: process.env.MONGO_DB_URL,
	USER_EMAIL: process.env.USER_EMAIL,
	USER_PASSWORD: process.env.USER_PASSWORD,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
	LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
	HOST_URL: process.env.HOST_URL,
}
