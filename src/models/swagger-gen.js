const m2s = require('mongoose-to-swagger')
const Recipe = require('./model-recipe.js')
const Ingredient = require('./model-ingredient.js')
const User = require('./model-user.js')

// Generate JSON from Mongoose Models.
const recipeJson = m2s(Recipe)
const ingredientJson = m2s(Ingredient)
const userJson = m2s(User, {
	omitFields: ['follows'],
})

const idJson = {
	type: 'string',
	length: 24,
}

const errorMessageJson = {
	type: 'object',
	properties: {
		message: {
			type: 'string',
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
