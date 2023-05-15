const mongoose = require('mongoose')
const imageSchema = require('./schema-image.js')
const nutritionSchema = require('./schema-nutrition.js')
const personSchema = require('./schema-person.js')
const videoSchema = require('./schema-video.js')
const {
	defaultString,
	RequiredDate,
	RequiredDuration,
	RequiredString,
	TrimmedString,
	ValidDuration,
	ValidUrl,
} = require('./validators.js')

const documentSchema = new mongoose.Schema(
	{
		'@type': defaultString('HowToStep'),
		image: [imageSchema],
		name: TrimmedString,
		text: RequiredString,
		url: ValidUrl,
	},
	{
		_id: false,
	},
)

const recipeSchema = new mongoose.Schema(
	{
		'@context': defaultString('http://schema.org'),
		'@type': defaultString('Recipe'),
		cookTime: RequiredDuration,
		datePublished: RequiredDate,
		description: RequiredString,
		keywords: [TrimmedString],
		name: RequiredString,
		nutrition: nutritionSchema,
		nutritionIds: ['ObjectId'],
		prepTime: ValidDuration,
		recipeCategory: [TrimmedString],
		recipeCuisine: [TrimmedString],
		recipeYield: [TrimmedString],
		totalTime: ValidDuration,
		author: [personSchema],
		authorIds: ['ObjectId'],
		owner: personSchema,
		ownerId: 'ObjectId',
		image: [imageSchema],
		recipeIngredient: [TrimmedString],
		recipeInstructions: [documentSchema],
		video: videoSchema,
	},
	{
		timestamps: true,
	},
)

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe
