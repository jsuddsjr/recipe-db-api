const mongoose = require('mongoose')
const imageSchema = require('./model-image-schema.js')
const Nutrition = require('./model-nutrition.js')
const User = require('./model-user.js')
const {
	defaultString,
	ImmutableObjectId,
	RequiredDate,
	RequiredDuration,
	RequiredString,
	RequiredUrl,
	TrimmedString,
	ValidDate,
	ValidDuration,
	ValidUrl,
} = require('./validators.js')

const documentSchema = new mongoose.Schema({
	'@type': defaultString('HowToStep'),
	image: imageSchema,
	name: RequiredString,
	text: RequiredString,
	url: ValidUrl,
})

const videoSchema = new mongoose.Schema({
	'@type': defaultString('VideoObject'),
	name: RequiredString,
	description: TrimmedString,
	thumbnailUrl: ValidUrl,
	contentUrl: RequiredUrl,
	embedUrl: ValidUrl,
	uploadDate: ValidDate,
	duration: ValidDuration,
	expires: ValidDate,
})

const recipeSchema = new mongoose.Schema(
	{
		'@type': defaultString('Recipe'),
		_id: ImmutableObjectId,
		cookTime: RequiredDuration,
		datePublished: RequiredDate,
		description: RequiredString,
		keywords: [TrimmedString],
		name: RequiredString,
		nutrition: [Nutrition.schema],
		prepTime: ValidDuration,
		recipeCategory: TrimmedString,
		recipeCuisine: TrimmedString,
		recipeYield: TrimmedString,
		totalTime: ValidDuration,
		author: User.schema,
		owner: User.schema,
		image: [imageSchema],
		ingredient: TrimmedString,
		recipeInstructions: [documentSchema],
		video: videoSchema,
	},
	{
		timestamps: true,
	},
)

const Recipe = mongoose.model('recipes', recipeSchema)

module.exports = Recipe
