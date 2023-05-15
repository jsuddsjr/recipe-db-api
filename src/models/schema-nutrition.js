const mongoose = require('mongoose')
const {
	RequiredString,
	TrimmedString,
	defaultString,
} = require('./validators.js')

const nutritionSchema = new mongoose.Schema(
	{
		'@type': defaultString('NutritionInformation'),
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
		_id: false,
	},
)

module.exports = nutritionSchema
