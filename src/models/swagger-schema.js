const path = require('node:path')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerSchemas = require('./swagger-gen.js')

const swaggerDefinition = {
	swagger: '2.0',
	info: {
		title: 'Recipe DB API',
		version: '1.0.0',
		description: 'A simple recipe database built with MongoDb and Express.js',
	},
	servers: [
		{
			url: 'http://localhost:3000',
			description: 'Local server',
		},
		{
			url: 'https://recipe-db-api.onrender.com',
			description: 'Render server',
		},
	],
	definitions: swaggerSchemas,
}

const swaggerSpec = swaggerJsdoc({
	swaggerDefinition,
	apis: [path.join(__dirname, '../routes/*.js')],
	failOnErrors: true,
})

module.exports = swaggerSpec
