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
		'@context': {
			...defaultString('http://schema.org'),
			description: 'The schema context.',
		},
		'@type': {
			...defaultString('NutritionInformation'),
			description: 'The schema type.',
		},
		name: {
			...RequiredString,
			example: 'Apple',
			description: 'The name of the food.',
		},
		servingSize: {
			required: true,
			...ValidServingSizeString,
			example: '1 cup',
			description: 'The serving size of the food.',
		},
		calories: {
			required: true,
			...ValidCalorieString,
			example: '100',
			description: 'The number of calories.',
		},
		carbohydrateContent: {
			...ValidMetricWeightString,
			example: '100 g',
			description: 'The carbohydrates.',
		},
		cholesterolContent: {
			...ValidMetricWeightString,
			example: '100 mg',
			description: 'The cholesterol.',
		},
		fiberContent: {
			...ValidMetricWeightString,
			example: '100 g',
			description: 'The fiber.',
		},
		proteinContent: {
			...ValidMetricWeightString,
			example: '100 g',
			description: 'The protein.',
		},
		saturatedFatContent: {
			...ValidMetricWeightString,
			example: '100 g',
			description: 'The saturated fat.',
		},
		sodiumContent: {
			...ValidMetricWeightString,
			example: '100 mg',
			description: 'The sodium.',
		},
		sugarContent: {
			...ValidMetricWeightString,
			example: '100 g',
			description: 'The sugar.',
		},
		fatContent: {
			...ValidMetricWeightString,
			example: '100 g',
			description: 'The fat.',
		},
		unsaturatedFatContent: {
			...ValidMetricWeightString,
			example: '100 g',
			description: 'The unsaturated fat.',
		},
	},
	{
		timestamps: true,
	},
)

const Ingredient = mongoose.model('ingredient', ingredientSchema)

module.exports = Ingredient
