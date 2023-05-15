const mongoose = require('mongoose')
const {
	defaultString,
	ValidCalorieString,
	ValidMetricWeightString,
} = require('./validators.js')

const nutritionSchema = new mongoose.Schema(
	{
		'@type': defaultString('NutritionInformation'),
		calories: {requred: true, ...ValidCalorieString},
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
