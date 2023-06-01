const mongoose = require('mongoose')
const imageSchema = require('./schemas/image.js')
const {
	defaultString,
	RequiredEmail,
	RequiredString,
	TrimmedString,
	ValidUrl,
} = require('./validators.js');

const userSchema = new mongoose.Schema(
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
		image: [{...imageSchema, description: 'A collection of user images.'}],
		followsIds: [{type: 'ObjectId', description: 'Favorite user ids.'}],
		favoriteIds: [{type: 'ObjectId', description: 'Favorite recipe ids.'}],
		keywords: [{...TrimmedString, description: 'A collection of keywords.'}],
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model('user', userSchema)

module.exports = User
