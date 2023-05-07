const mongoose = require('mongoose')
const {pattern} = require('iso8601-duration')
const {isValidISODateString} = require('iso-datestring-validator')

const ValidDuration = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return pattern.test(value)
		},
		message: (props) => `${props.value} not a valid ISO8601 duration`,
	},
}

const ValidDate = {
	type: String,
	trim: true,
	validate: {
		validator(value) {
			return isValidISODateString(value)
		},
		message: (props) => `${props.value} is not a valid ISO8601 date`,
	},
}

const documentSchema = new mongoose.Schema({
	'@type': {type: String, default: 'HowToStep'},
	image: {type: String, trim: true},
	name: {type: String, trim: true, required: true},
	text: {type: String, trim: true, required: true},
	url: {type: String, trim: true},
})

const videoSchema = new mongoose.Schema({
	'@type': {type: String, default: 'VideoObject'},
	name: String,
	description: String,
	thumbnailUrl: [String],
	contentUrl: String,
	embedUrl: String,
	uploadDate: ValidDate,
	duration: ValidDuration,
	expires: ValidDate,
})

const recipeSchema = new mongoose.Schema(
	{
		'@context': {type: String, default: 'https://schema.org/'},
		'@type': {type: String, default: 'Recipe'},
		_id: {type: mongoose.Schema.Types.ObjectId, immutable: true},
		aggregateRating: {
			'@type': {type: String, default: 'AggregateRating'},
			ratingValue: String,
			ratingCount: String,
		},
		cookTime: ValidDuration,
		datePublished: {type: Date, default: Date.now()},
		description: {type: String, required: true},
		keywords: {type: String},
		name: {type: String, trim: true, required: true},
		nutrition: {
			'@type': {type: String, default: 'NutritionInformation'},
			calories: String,
		},
		prepTime: ValidDuration,
		recipeCategory: {type: String, trim: true},
		recipeCuisine: {type: String, trim: true},
		recipeYield: {type: String, trim: true},
		totalTime: ValidDuration,
		author: {
			'@type': {type: String, default: 'Person'},
			name: {type: String, trim: true},
		},
		image: [String],
		ingredient: [String],
		recipeInstructions: [documentSchema],
		video: videoSchema,
	},
	{
		timestamps: true,
	},
)

const Recipe = mongoose.model('recipes', recipeSchema)

module.exports = Recipe
