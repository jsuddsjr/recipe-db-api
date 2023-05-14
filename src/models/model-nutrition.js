const mongoose = require('mongoose')
const {RequiredString, defaultString} = require('./validators.js')

const nutritionSchema = new mongoose.Schema(
	{
		'@type': defaultString('NutritionInformation'),
		name: RequiredString,
		servingSize: RequiredString,
		calories: RequiredString,
	},
	{
		timestamps: true,
	},
)

const Nutrition = mongoose.model('nutritionInformation', nutritionSchema)

module.exports = Nutrition
