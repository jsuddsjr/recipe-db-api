/* eslint-disable unicorn/no-null */
const path = require('node:path')
const swaggerAutogen = require('swagger-autogen')
const m2s = require('mongoose-to-swagger')
const models = require('./models')
const hostUrl = new URL(require('./config/config').HOST_URL)

const arguments_ = new Set(require('node:process').argv.slice(2))

const InsertedDocument = {
	properties: {
		_id: {
			type: 'string',
			length: 24,
			example: '5e4a1d5b5e5e5e5e5e5e5e5e',
			description: 'A unique identifier.',
		},
	},
}

const ErrorMessage = {
	description: 'Error object.',
	properties: {
		message: {
			type: 'string',
			example: 'The error message.',
			description: 'The error message.',
		},
	},
}

const swaggerDefinition = {
	swagger: '2.0',
	info: {
		title: 'Recipe DB API',
		version: '0.0.1',
		description: `
A simple recipe database built with MongoDb and Express.js.

### 401 Unauthorized
To use routes that modify data, you need to be authenticated. To authenticate, you can use one of the following methods:

- <a href='/auth/google' target='_self'>Click here to log in with your Google account</a>.
- <a href='/auth/github' target='_self'>Click here to log in with your GitHub account</a>.
- [Click here to verify your user account](/auth/me).
- <a href='/auth/logout' target='_self'>Click here to log out</a>.

### Credits
This API was written by [John Sudds](mailto:jsuddsjr@github.com) for CSE 341. [Source code is available on GitHub](https://github.com/jsuddsjr/recipe-db-api).

**This api not intended for serious use.**
`,
	},
	contact: {
		name: 'John Sudds',
		url: 'https://github.com/jsuddsjr',
		email: 'jsuddsjr@noreply.github.com'
	},
	schemes: [hostUrl.protocol.slice(0, -1)],
	host: hostUrl.host,
	basePath: '/api',

	//! The @definitions property is copied as-is to the output.
	// eslint-disable-next-line unicorn/no-array-reduce
	'@definitions': Object.keys(models).reduce(
		(accumulator, key) => {
			accumulator[key] = m2s(models[key], {
				props: ['example', 'description'],
				omitFields: ['_id', 'createdAt', 'updatedAt'],
			})
			accumulator[`${key}Array`] = {
				type: 'array',
				items: {
					$ref: `#/definitions/${key}`,
					description: 'An array of ' + key + ' objects.',
				},
			}
			return accumulator
		},
		{
			InsertedDocument,
			ErrorMessage,
		},
	),
}

const buildSwagger = async () => {
	const outputFile = path.join(__dirname, './swagger.json')
	const endpointsFiles = [path.join(__dirname, './routes/api/*.js')]

	const result = await swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition)
	if (result.success && result.data) {
		console.log(`Swagger JSON file was created on ${result.data.host || '(missing HOST_URL)'}.`)
		if (arguments_.has('--serve')) {
			console.log('Starting server...')
			require('./bin/www')	// Start the server.
		}
	} else {
		throw new Error("Unable to create Swagger JSON file")
	}
}

buildSwagger()
