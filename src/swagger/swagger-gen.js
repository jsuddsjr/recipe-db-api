const m2s = require('mongoose-to-swagger')
const Recipe = require('../models/recipe.js')
const Ingredient = require('../models/ingredient.js')
const User = require('../models/user.js')

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

// eslint-disable-next-line unicorn/no-array-reduce
const definitions = [Ingredient, Recipe, User].reduce(
	(acc, model) => {
		acc[model.modelName] = m2s(model, {
			props: ['example', 'description'],
			omitFields: ['_id', 'createdAt', 'updatedAt'],
		})
		acc[`${model.modelName}Array`] = {
			type: 'array',
			items: {
				$ref: `#/definitions/${model.modelName}`,
				description: 'An array of ' + model.modelName + ' objects.',
			},
		}
		return acc
	},
	{
		InsertedDocument,
		ErrorMessage,
	},
)

const swaggerDefinition = {
	swagger: '2.0',
	info: {
		title: 'Recipe DB API',
		version: '0.0.1',
		description: `
A simple recipe database built with MongoDb and Express.js.

### 401 Unauthorized
To use routes that modify data, you need to be authenticated. [Click here to log in with your Google account](/auth/google).

### Credits
This API was written by [John Sudds](mailto:jsuddsjr@github.com) for CSE 341. [Source code is available on GitHub](https://github.com/jsuddsjr/recipe-db-api).

**This api not intended for regular use.**
`,
	},
	host: 'recipe-db-api.onrender.com',
	schemes: ['https'],
	definitions,
}
