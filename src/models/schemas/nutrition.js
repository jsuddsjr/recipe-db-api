const {Schema} = require('mongoose')
const {
	defaultString,
	RequiredString,
	ValidCalorieString,
	ValidMetricWeightString,
	ValidServingSizeString,
} = require('../validators')

const nutritionSchema = new Schema(
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
			description: 'The serving size of the food.',
		},
		calories: {
			required: true,
			...ValidCalorieString,
		},
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
		_id: false,
	},
)

module.exports = nutritionSchema
