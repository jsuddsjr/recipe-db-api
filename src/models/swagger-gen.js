const m2s = require('mongoose-to-swagger')
const Recipe = require('./recipe.js')
const Ingredient = require('./ingredient.js')
const User = require('./user.js')

// Generate JSON from Mongoose Models.
const recipeJson = m2s(Recipe)
const ingredientJson = m2s(Ingredient)
const userJson = m2s(User, {
	omitFields: ['follows'],
})

const idJson = {
	type: 'string',
	length: 24,
	example: '5e4a1d5b5e5e5e5e5e5e5e5e',
	description: 'The unique identifier.',
}

const errorMessageJson = {
	type: 'object',
	properties: {
		message: {
			type: 'string',
			example: 'The error message.',
			description: 'The error message.',
		},
	},
}

module.exports = {
	Recipe: {type: 'object', ...recipeJson},
	Ingredient: {type: 'object', ...ingredientJson},
	User: {type: 'object', ...userJson},
	Id: idJson,
	ErrorMessage: errorMessageJson,
}
