const {Schema, model} = require('mongoose')
const imageSchema = require('./schemas/image')
const nutritionSchema = require('./schemas/nutrition')
const personSchema = require('./schemas/person')
const videoSchema = require('./schemas/video')
const {
	defaultString,
	foreignKey,
	RequiredDate,
	RequiredDuration,
	RequiredString,
	TrimmedString,
	ValidDuration,
	ValidUrl,
} = require('./validators')
const User = require('./user')
const Ingredient = require('./ingredient')

const documentSchema = new Schema(
	{
		'@type': {...defaultString('HowToStep'), description: 'The schema type.'},
		image: [{ type: imageSchema, require: false, description: 'Gallery of images.' }],
		name: {
			...TrimmedString,
			example: 'Start Your Ovens!',
			description: 'The optional name of the step.',
		},
		text: {
			...RequiredString,
			example: 'Preheat the oven to 375°.',
			description: 'The text of the step.',
		},
		url: {
			...ValidUrl,
			example: 'https://example.com#step',
			description: 'The page anchor of the step.',
		},
	},
	{
		_id: false,
	},
)

const recipeSchema = new Schema(
	{
		'@context': {
			...defaultString('http://schema.org'),
			description: 'The schema context.',
		},
		'@type': {...defaultString('Recipe'), description: 'The schema type.'},
		cookTime: {
			...RequiredDuration,
			description: 'The time it takes to actually cook the dish.',
		},
		datePublished: {...RequiredDate, description: 'The publish date.'},
		description: {...RequiredString, description: 'The recipe description.'},
		image: [{ type: imageSchema, description: 'A gallery of recipe images.'}],
		name: {
			...RequiredString,
			example: 'Amazingly Easy Irish Soda Bread',
			description: 'Recipe title.',
		},
		nutrition: { type: nutritionSchema, description: 'The aggregated nutrition info.' },
		owner: { type: personSchema, description: 'The owner of this recipe.' },
		prepTime: {...ValidDuration, description: 'The prep time.'},
		recipeCategory: [
			{
				...TrimmedString,
				example: 'breads',
				description:
					'The category of the recipe—for example, appetizer, entree.',
			},
		],
		recipeCuisine: [
			{
				...TrimmedString,
				example: 'Irish',
				description:
					'The cuisine of the recipe (for example, French or Ethiopian).',
			},
		],
		recipeIngredient: [
			{
				...TrimmedString,
				example: '1 tsp Baking Soda',
				description:
					'A single ingredient used in the recipe, e.g. sugar, flour or garlic.',
			},
		],
		recipeInstructions: [{ type: documentSchema, description: 'A list of recipe steps.' }],
		recipeYield: [
			{
				...TrimmedString,
				example: '1 loaf',
				description: 'The quantity produced by the recipe.',
			},
		],
		totalTime: {
			...ValidDuration,
			description: 'The total time it takes to prepare and cook the recipe.',
		},
		video: { type: videoSchema, description: 'An optional video.' }
	},
	{
		timestamps: true,
	},
)

recipeSchema.add({
	authorIds: [foreignKey(User, 'Author ids.')],
	ownerId: foreignKey(User, 'Owner id.'),
	nutritionIds: [foreignKey(Ingredient, 'Ingredient ids.')],
})

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
