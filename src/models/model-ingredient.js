const mongoose = require('mongoose')
const {
	RequiredString,
	TrimmedString,
	defaultString,
} = require('./validators.js')

const ingredientSchema = new mongoose.Schema(
	{
		'@type': defaultString('NutritionInformation'),
		name: RequiredString,
		servingSize: RequiredString,
		calories: RequiredString,
		carbohydrateContent: TrimmedString,
		cholesterolContent: TrimmedString,
		fiberContent: TrimmedString,
		proteinContent: TrimmedString,
		saturatedFatContent: TrimmedString,
		sodiumContent: TrimmedString,
		sugarContent: TrimmedString,
		fatContent: TrimmedString,
		unsaturatedFatContent: TrimmedString,
	},
	{
		timestamps: true,
	},
)

const Ingredient = mongoose.model('ingredients', ingredientSchema)

module.exports = Ingredient
