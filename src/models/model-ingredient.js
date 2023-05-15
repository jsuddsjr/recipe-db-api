const mongoose = require('mongoose')
const {
	defaultString,
	RequiredString,
	ValidCalorieString,
	ValidMetricWeightString,
	ValidServingSizeString,
} = require('./validators.js')

const ingredientSchema = new mongoose.Schema(
	{
		'@type': defaultString('NutritionInformation'),
		name: RequiredString,
		servingSize: {required: true, ...ValidServingSizeString},
		calories: {required: true, ...ValidCalorieString},
		carbohydrateContent: ValidMetricWeightString,
		cholesterolContent: ValidMetricWeightString,
		fiberContent: ValidMetricWeightString,
		proteinContent: ValidMetricWeightString,
		saturatedFatContent: ValidMetricWeightString,
		sodiumContent: ValidMetricWeightString,
		sugarContent: ValidMetricWeightString,
		fatContent: ValidMetricWeightString,
		unsaturatedFatContent: ValidMetricWeightString,
	},
	{
		timestamps: true,
	},
)

const Ingredient = mongoose.model('ingredients', ingredientSchema)

module.exports = Ingredient
