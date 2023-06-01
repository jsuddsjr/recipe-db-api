const mongoose = require('mongoose')
const imageSchema = require('./schemas/image.js')
const nutritionSchema = require('./schemas/nutrition.js')
const personSchema = require('./schemas/person.js')
const videoSchema = require('./schemas/video.js')
const {
	defaultString,
	foreignKey,
	RequiredDate,
	RequiredDuration,
	RequiredString,
	TrimmedString,
	ValidDuration,
	ValidUrl,
} = require('./validators.js');
const User = require('./user.js');
const Ingredient = require('./ingredient.js');

const documentSchema = new mongoose.Schema(
	{
		'@type': {...defaultString('HowToStep'), description: 'The schema type.'},
		image: [
			{
				...imageSchema,
				example: 'https://example.com/image.jpg',
				description: 'The image.',
			},
		],
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
);

const recipeSchema = new mongoose.Schema(
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
		image: [{...imageSchema, description: 'Recipe images.'}],
		name: {
			...RequiredString,
			example: 'Amazingly Easy Irish Soda Bread',
			description: 'Recipe title.',
		},
		nutrition: {
			...nutritionSchema,
			description: 'Aggregated nutrition information about the recipe.',
		},
		owner: {...personSchema, description: 'Recipe owner.'},
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
		recipeInstructions: [
			{...documentSchema, description: 'A step in making the recipe.'},
		],
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
		video: {...videoSchema, description: 'An optional instructional video.'},
	},
	{
		timestamps: true,
	},
);

recipeSchema.add({
	authorIds: [foreignKey(User, 'Author ids.')],
	ownerId: foreignKey(User, 'Owner id.'),
	nutritionIds: [foreignKey(Ingredient, 'Ingredient ids.')],
});

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe
