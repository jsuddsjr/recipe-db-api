const mongoose = require('mongoose')
const imageSchema = require('./schemas/image.js')
const {
	defaultString,
	RequiredEmail,
	RequiredString,
	TrimmedString,
	ValidUrl,
} = require('./validators.js')

const userSchema = mongoose.Schema(
	{
		'@context': {
			...defaultString('http://schema.org'),
			description: 'The schema context.',
		},
		'@type': {...defaultString('Person'), description: 'The schema type.'},
		name: {
			...RequiredString,
			example: 'John Doe',
			description: 'The user name.',
		},
		email: {
			...RequiredEmail,
			example: 'john.doe@example.com',
			description: 'The user email.',
		},
		url: [
			{
				...ValidUrl,
				example: 'https://example.com',
				description: 'The user URL.',
			},
		],
		image: [imageSchema],
		keywords: [{ ...TrimmedString, description: 'A collection of keywords.' }],
	},
	{
		timestamps: true,
	},
)

userSchema.add({
	// TODO: Add following and favorite recipes.
	// followsIds: [{type: 'ObjectId', description: 'Favorite user ids.'}],
	// favoriteIds: [{type: 'ObjectId', description: 'Favorite recipe ids.'}],
})

const User = mongoose.model('user', userSchema)

module.exports = User
