const mongoose = require('mongoose')
const imageSchema = require('./schema-image.js')
const nutritionSchema = require('./schema-nutrition.js')
const personSchema = require('./schema-person.js')
const {
	defaultString,
	RequiredDate,
	RequiredDuration,
	RequiredString,
	RequiredUrl,
	TrimmedString,
	ValidDate,
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

const videoSchema = new mongoose.Schema(
	{
		'@type': defaultString('VideoObject'),
		name: RequiredString,
		description: TrimmedString,
		thumbnailUrl: ValidUrl,
		contentUrl: RequiredUrl,
		embedUrl: ValidUrl,
		uploadDate: ValidDate,
		duration: ValidDuration,
		expires: ValidDate,
	},
	{
		_id: false,
	},
)

const recipeSchema = new mongoose.Schema(
	{
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
		authorId: 'ObjectId',
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

const Recipe = mongoose.model('recipes', recipeSchema)

module.exports = Recipe
